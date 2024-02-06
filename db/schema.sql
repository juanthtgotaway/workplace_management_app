DROP DATABASE IF EXISTS workplace_management_db;

CREATE DATABASE workplace_management_db;

USE workplace_management_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL, 
    role ENUM('admin', 'management', 'agent', 'customer_service') NOT NULL
);

-- should we rename chores?
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    assigned_to INT, 
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

CREATE TABLE resources (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    location VARCHAR(255),
    owner_id INT, 
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- should we rename reports?
CREATE TABLE incidents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    reported_by INT,
    status ENUM('pending', 'resolved', 'closed') DEFAULT 'pending',
    FOREIGN KEY (reported_by) REFERENCES users(id)
);