Work Place App
Welcome to the Work Place App! This system is designed to streamline the management of employees, departments, schedules, reports, and chores within an organization. With its user-friendly interface and comprehensive features, managing your workforce has never been more efficient.

Features
User Management: Create, update, and delete user accounts with customizable roles and permissions.
Department Management: Organize employees into departments and assign managers to oversee each department.
Schedule Management: Easily create and manage employee schedules, ensuring proper coverage and shift assignments.
Report Management: Generate and view reports on employee performance, attendance, and other key metrics.
Chore Management: Assign and track chores or tasks to be completed by employees or departments.


Installation
Clone this repository to your local machine:

bash
git clone https://github.com/jamesbruckner/workplace_management_app.git

Navigate to the project directory:
bash
cd workplace-/management_app

Install dependencies:
npm install
Set up environment variables:

Create a .env file in the root directory.
Add the necessary environment variables, such as database connection details and session secrets, following the format specified in .env.example.

Set up the database:
Create a database for the application (e.g., using MySQL).
Update the database configuration in config/connection.js with your database details.

Usage
User Registration: Users can register for an account by providing their information and selecting a department.
User Login: Registered users can log in to access their dashboard and perform various actions based on their role and permissions.
Administrator Dashboard: Administrators have access to advanced functionalities such as user management, department management, and report generation.
Employee Dashboard: Employees can view their schedules, submit reports, and complete assigned chores.
Manager Dashboard: Managers have additional capabilities, such as overseeing department schedules and approving reports submitted by their team members.


Technologies Used
Node.js
Express.js
Sequelize (ORM)
MySQL (Database)
Handlebars (Template Engine)
Bootstrap (Frontend Framework)


Contributing
Ophelia Early, Juan Acevedo Martinex, James Bruckner, Lily Vanderbloemen

License
This project is licensed under the MIT License.

