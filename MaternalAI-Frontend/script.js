document.addEventListener("DOMContentLoaded", function () {

    loadUsers();

    // START BUTTON (Backend test)
    document.getElementById("startBtn").addEventListener("click", function () {
        fetch("http://localhost:8080/api/users")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                showToast("Backend Connected Successfully!");
            })
            .catch(err => {
                console.error(err);
                showToast("Backend Connection Failed!");
            });
    });

    // REGISTER USER
    document.getElementById("registerBtn").addEventListener("click", function () {

        const user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        if (!user.name || !user.email || !user.password) {
            showToast("Please fill all fields");
            return;
        }

        fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if (!res.ok) throw new Error("Registration failed");
            return res.json();
        })
        .then(() => {
            showToast("User Registered Successfully");
            speak("User registered successfully");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            loadUsers();
        })
        .catch(err => {
            console.log(err);
            showToast("Failed to fetch");
        });
    });
});


// ================= LOAD USERS =================
function loadUsers() {

    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(data => {

            document.getElementById("totalUsers").innerText = data.length;

            if (data.length === 0) {
                document.getElementById("userTable").innerHTML =
                    "<tr><td colspan='5'>No users found</td></tr>";
                return;
            }

            let rows = "";

            data.forEach(user => {
                rows += `
<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>
        <button onclick="deleteUser(${user.id})">Delete</button>
    </td>
</tr>
`;
            });

            document.getElementById("userTable").innerHTML = rows;
        })
        .catch(err => console.log(err));
}


// ================= SEARCH USERS =================
function searchUsers() {

    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#userTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}


// ================= DELETE USER =================
function deleteUser(id) {

    if (!confirm("Are you sure you want to delete this user?")) return;

    fetch(`http://localhost:8080/api/users/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        showToast("User Deleted Successfully");
        loadUsers();
    })
    .catch(err => {
        console.log(err);
        showToast("Delete failed");
    });
}


// ================= TOAST =================
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "toast show";

    setTimeout(() => {
        toast.className = "toast";
    }, 2000);
}


// ================= SPEECH =================
function speak(message) {
    let speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}


// ================= VOICE RECOGNITION =================
function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;

    recognition.onstart = () => {
        console.log("Voice started...");
    };

    recognition.onresult = (event) => {
        let text = event.results[0][0].transcript;
        console.log("Heard:", text);
        processVoiceCommand(text);
    };

    recognition.onerror = (event) => {
        console.log("Voice error:", event.error);
        alert("Voice error: " + event.error);
    };

    recognition.start();
}


// ================= VOICE COMMAND =================
function processVoiceCommand(text) {

    text = text.toLowerCase();

    let emailMatch = text.match(
        /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    );

    let email = emailMatch ? emailMatch[0] : "";

    let passwordMatch = text.match(/(password|pass)\s*[:\-]?\s*(\w+)/i);
    let password = passwordMatch ? passwordMatch[2] : "";

    let name = text
        .replace("register", "")
        .replace(email, "")
        .replace(/password\s*[:\-]?\s*\w+/i, "")
        .trim();

    if (!name || !email || !password) {
        alert("Could not understand voice properly");
        return;
    }

    registerFromVoice(name, email, password);
}


// ================= VOICE REGISTER =================
function registerFromVoice(name, email, password) {

    fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(res => {
        if (!res.ok) throw new Error("Register failed");
        return res.json();
    })
    .then(() => {
        showToast("User Registered Successfully");
        speak("User registered successfully");
        loadUsers();
    })
    .catch(err => {
        console.log(err);
        alert("Registration failed");
    });
}