# Project Title

**MaternalAI – Voice Assistant for Pregnancy Care and Health Monitoring**

---

# Problem Statement

Pregnant women often face difficulties in accessing timely healthcare guidance, tracking pregnancy progress, remembering medical appointments, and understanding pregnancy-related information. Lack of continuous assistance and limited accessibility to healthcare resources can create challenges, especially for women in remote areas.

The **MaternalAI Voice Assistant** aims to provide an intelligent and user-friendly AI-based solution that helps expecting mothers receive pregnancy-related information, track important health details, and interact through voice-based assistance for better maternal care.

---

# Project Objectives

* To develop an AI-powered voice assistant for supporting pregnant women with healthcare guidance.
* To provide voice-based interaction for easy and accessible communication.
* To track pregnancy progress based on the user's Last Menstrual Period (LMP).
* To provide pregnancy-related reminders and useful health information.
* To store and manage user details securely using a database.
* To create a simple and user-friendly interface for better accessibility.
* To integrate AI technologies for personalized maternal assistance.

---

# Module Lists

### 1. User Registration and Authentication Module

* User account creation and login functionality.
* Secure storage of user information.

### 2. Pregnancy Tracker Module

* Calculate pregnancy weeks based on LMP date.
* Display pregnancy progress and estimated due date.
* Provide trimester-based information.

### 3. AI Voice Assistant Module

* Voice-based interaction with users.
* Speech recognition for receiving user queries.
* AI-generated responses for pregnancy-related questions.

### 4. Maternal Health Information Module

* Provides information about nutrition, exercise, and pregnancy care.
* Gives trimester-wise health guidance.

### 5. Reminder and Notification Module

* Helps users remember important pregnancy activities.
* Provides alerts for checkups and health routines.

### 6. Database Management Module

* Stores user profiles and pregnancy details.
* Manages application data using MySQL database.

### 7. Backend Management Module

* Handles API communication.
* Manages application logic using Spring Boot backend.

---

# Table Lists

### User Table

| Field Name | Data Type | Description                |
| ---------- | --------- | -------------------------- |
| user_id    | Integer   | Unique user identification |
| name       | Varchar   | User name                  |
| email      | Varchar   | User email                 |
| password   | Varchar   | User password              |
| phone      | Varchar   | Contact number             |

---

### Pregnancy Details Table

| Field Name   | Data Type | Description                 |
| ------------ | --------- | --------------------------- |
| pregnancy_id | Integer   | Unique pregnancy record ID  |
| user_id      | Integer   | User reference ID           |
| lmp_date     | Date      | Last Menstrual Period date  |
| due_date     | Date      | Expected delivery date      |
| trimester    | Varchar   | Current pregnancy trimester |

---

### Health Information Table

| Field Name  | Data Type | Description             |
| ----------- | --------- | ----------------------- |
| health_id   | Integer   | Unique health record ID |
| user_id     | Integer   | User reference ID       |
| category    | Varchar   | Health category         |
| information | Text      | Health guidance details |

---

### Reminder Table

| Field Name    | Data Type | Description       |
| ------------- | --------- | ----------------- |
| reminder_id   | Integer   | Reminder ID       |
| user_id       | Integer   | User reference ID |
| reminder_date | Date      | Reminder schedule |
| reminder_type | Varchar   | Type of reminder  |

---

### Voice Interaction Table

| Field Name     | Data Type | Description       |
| -------------- | --------- | ----------------- |
| interaction_id | Integer   | Interaction ID    |
| user_id        | Integer   | User reference ID |
| query          | Text      | User voice query  |
| response       | Text      | AI response       |

---

# Expected Outcomes

* A functional AI-based voice assistant for maternal healthcare support.
* Easy access to pregnancy-related information through voice interaction.
* Improved pregnancy tracking and health awareness among users.
* Personalized assistance based on pregnancy stage.
* Secure storage and retrieval of user health-related information.
* Reduced dependency on manual information searching.

---

# Future Enhancements

* Integration with wearable health monitoring devices.
* Real-time doctor consultation support through the application.
* Multilingual voice support for regional languages.
* AI-based risk prediction for pregnancy complications.
* Integration with hospital appointment systems.
* Mobile application development for Android and iOS.
* Advanced chatbot capabilities with improved medical knowledge.
* Emergency alert system for critical situations.
