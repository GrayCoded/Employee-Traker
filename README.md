# Employee-Traker
Business model using Mysql

##Description

This is a project that allows you to manage your employees by using inquirer for prompts and mysql2 to connect your database to the terminal.

##Usage

To use this command line interface you:

First have to clone this repository

Second load up your MySQL workbench or whatever you use to create databases

Third copy everything in:

schema.sql

seeds.sql

and put it in your workbench, run it and now you will have pre-populated your database to make things easier for you.

Make sure to put your OWN mysql information into db.js in this code snippet:

const connection = mysql.createConnection({

host: process.env.host,

user: process.env.user,

password: process.env.password,

database: process.env.database

})
Replace the process.env to your information, or in turn make a .env file and make it secure shown above.

Then go through the prompts and do what you please!

Screenshots
![](./assets/SHOT_1.png)
![](./assets/SHOT_DEPARTMENT.png)
![](./assets/SHOT_EMPLOYEES.png)
![](./assets/SHOT_ROLES.png)


##Walkthrough Video

https://drive.google.com/file/d/1WYhyNVNNnHtaIMQcqVu4x_hZz4-GkBXy/view

##Technologies Used

MySQL

Node.js

Javascript

Git

GitHub

Credits

This project was created by Daniel Grayson