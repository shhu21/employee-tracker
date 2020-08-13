# employee-tracker

# Demo
[Demo Video](https://drive.google.com/file/d/1-hUfPmmsojVYBEgD8j8MyTe6z7uXMz-K/view)

# Table Of Contents

* [Description](#description)
* [Installation](#installation)
* [User's Guide](#users-guide)
  - [View all departments](#view-all-departments)
  - [View all roles](#view-all-roles)
  - [View all employees](#view-all-employees)
  - [View employees by manager](#view-employees-by-manager)
  - [View employees by department](#view-employees-by-department)
  - [Add a department](#add-a-department)
  - [Add a role](#add-a-role)
  - [Add an employee](#add-an-employee)
  - [Update an employee's role](#update-an-employees-role)
  - [Update an employee's manager](#update-an-employees-manager)
  - [Delete a department](#delete-a-department)
  - [Delete a role](#delete-a-role)
  - [Delete an employee](#delete-an-employee)
  - [View the total utilized budget of a department](#view-the-total-utilized-budget-of-a-department)
  - [Quit](#quit)
 * [Testing](#testing)

# Description
Builds a database to organize employees using user input from the command line.

# Installation
1. Clone the repository.
2. Run `npm install` in the command line to install the dependancies.
3. Run `npm start` in the command line to start the program.

# User's Guide
As mentioned in the [Installation](#installation) instructions, run `npm start` to start the program.  The user may choose from the list of features (view below for a full list of features) or choose `Quit` to stop the program.  View the [Demo](#demo) for a video walkthrough of the program. </br>

The following is a list of prompts for available feature:  </br>
*Note: All prompts are required.*

## View all departments
__Description:__ Displays a table of all departments. </br>
__Columns:__ id, department

## View all roles
__Description:__ Displays a table of all roles. </br>
__Columns:__ id, title (role), salary, department

## View all employees
__Description:__ Displays a table of all employees. </br>
__Columns:__ employee name, title (role), salary, department

## View employees by manager
__Description:__ Displays a table of employees by manager. </br>
__Columns:__ employee

## View employees by department
__Description:__ Displays a table of employees by department. </br>
__Columns:__ department, title, employee

## Add a department
__Description:__ Adds a department.

## Add a role
__Description:__ Adds a role.

## Add an employee
__Description:__ Adds an employee.

## Update an employee's role
__Description:__ Updates an employee's role.

## Update an employee's manager
__Description:__ Updates an employee's manager.

## Delete a department
__Description:__ Deletes a department.

## Delete a role
__Description:__ Deletes a role.

## Delete an employee
__Description:__ Deletes an employee.

## View the total utilized budget of a department
__Description:__ Displays the total budget of a department (sum of all employee's salaries in a department).

## Quit
__Description:__ Quits the program.

# Testing
Template seed data is available in `./db/seeds.sql`.
