<h2>Description</h2>

A hotel management system with registered user and admin roles, in addition to unregistered user. UI in lithuanian. Functionality for viewing, searching and booking hotels on the user side and adding, removing and updating hotels, as well as confirming orders, on the admin side.

React.js used for frontend and Laravel for backend. Used token-based authentication with sanctum, in addition to protected routes on the frontend.

This is the frontend repository. You can access the backend repository <a href = "https://github.com/mykolasbar/kelioniu_uzsakymo_platforma/">here</a>.

<h2>Instructions for launch</h2>

<h2>Functionality</h2>

<ul>
    <li>User roles:<li>
        <ul>
            <li>Unregistered user</li>
            <li>Registered user</li>
            <li>Admin</li>
        </ul>
    <li>Unregistered user:</li>
        <ul>
            <li>View hotels</li>
            <li>Filter hotels by country</li>
            <li>Search hotels by name</li>
        </ul>
    <li>Regular user:</li>
        <ul>
            <li>View hotels</li>
            <li>Filter hotels by country</li>
            <li>Search hotels by name</li>
            <li>Book a hotel</li>
            <li>See status of hotel booking (confirmed or not)</li>
        </ul>
    <li>Admin</li>
        <ul>
            <li>Add, update, delete hotels</li>
            <li>Add pictures for hotels</li>
            <li>Add update, delete countries</li>
            <li>See list of incoming bookings with user info</li>
            <li>Confirm bookings</li>
        </ul>
</ul>

<h2>Launch instructions</h2>

The project is not deployed online, so in order to view it, you will have to download it from github and launch it on the live server.

<ul>
    <li>Launch your apache server and MySQL</li>
    <li>Clone or download the github repository</li>
    <li>Import the database (Dump20221021 file in the downloaded repository) with MySQL Workbench or similar software</li>
    <li>Launch the development server for the backup section on port http://127.0.0.1:8000/ (instructions <a href = "https://github.com/mykolasbar/kelioniu_uzsakymo_platforma">here</a>)</li>
    <li>In case your do not have it, install npm (node package manager) and launch the development server from the app directory with your cli (npm start). The user page should load</li>
    <li>To reach the admin section, register an account (http://localhost:3000/register) and login with your credentials</li>
</ul>


Made by Mykolas Baranauskas. <a href = "https://www.linkedin.com/in/mykolas-baranauskas-b3809b110/" target = "_blank">Linkedin</a>.