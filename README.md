# Phone Repair Center Management System

## Overview
This web application is designed to facilitate the management of a phone repair service center. It allows various actors such as administrators, technicians, and partners to interact with the system to manage user authentication, users, tickets, models, customers, and more. The system handles ticket lifecycle, user management, and device model management seamlessly through a MERN (MongoDB, Express.js, React.js, Node.js) stack.

## Features

### User Authentication
- **Login:** Allows registered users (Admin, Technician, Partner) to access their specific areas.
- **Logout:** Allows users to safely log out of the application.

### User Management
- **View Users:** Admin can view a list of all users (partners and technicians).
- **Add Partner/Technician:** Admin can add partners and technicians by providing relevant details.
- **Delete User:** Admin can delete any partner or technician.
- **Edit User:** Users can edit their details such as password, email, phone number, etc.

### Ticket Management
- **View Tickets:** Admins and technicians can view and filter a list of all tickets.
- **Ticket Details:** Every user can view detailed information about a ticket.
- **Manage Ticket States:** Transition of ticket states from opened, accepted, to various stages till completion.
- **Delete Ticket:** Partners can delete a ticket if it is in the 'Open' state.
- **Search and Barcode Integration:** Tickets can be searched using a barcode system.

### Customer Management
- **Add Customer:** Partners can add customers.
- **View Customers:** Partners can view a list of their customers.

### Model and Service Management
- **Add/View/Edit/Delete Models:** Manage device models and their associated repair services.
- **Tariff Management:** Add, update, or remove service tariffs for each model.

## Setup and Installation

### Prerequisites
- Node.js
- MongoDB
- npm/yarn

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/giuseppepaolisi/riparaloApp.git
   cd riparaloApp
2. Install dependencies for server:
    ```bash
    cd backend
    npm install
3. Install dependencies for client:
    ```bash
    cd frontend
    npm install

4. Set up your environment variables in .env file:
    ```plaintext
    MONGO_URI=<your_mongodb_uri>
    PORT=4000

5. Run the server:
    ```bash
    cd backend
    npm start

6. Run the client:

    ```bash
    cd frontend
    npm start
Copyright © 2024
[Giuseppe Paolisi](https://github.com/giuseppepaolisi)
[Christian Gemelli](https://github.com/).
