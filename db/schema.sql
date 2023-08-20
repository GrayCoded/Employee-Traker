DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

drop table if exists Employees;
drop table if exists Departments;
drop table if exists Roles;
drop table if exists Budgets;

CREATE TABLE Departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Department VARCHAR(50) NOT NULL
);

CREATE TABLE Roles (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  Title VARCHAR(30) NOT NULL,
  Salary DECIMAL(10, 2) NOT NULL,
  Department_id INT,
  FOREIGN KEY (Department_id) 
  REFERENCES Departments(id) ON DELETE CASCADE
);

CREATE TABLE Employees (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  First_Name VARCHAR(30) NOT NULL,
  Last_Name VARCHAR(30) NOT NULL,
  Role_id INT,
  Manager_id INT,
  FOREIGN KEY (Role_id) REFERENCES Roles(id),
  FOREIGN KEY (Manager_id) REFERENCES Employees(id)
);


CREATE TABLE Budgets (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  Department_id INT ,
  Amount DECIMAL(12, 2) NOT NULL,
  FOREIGN KEY (Department_id) REFERENCES Departments(id)
);