## TuitionPoint
A student management system, where teachers can perform administrative functions for their students. Teachers and students are identified by their email addresses.
The API endpoints written  for a student management system, TuitionPoint, where teachers can perform administrative functions for their students. Teachers and students are identified by their email addresses.
The application is built using Node.js and MySql.
The application contains three table.
 ### Student : - Contains the student_id of all the students in the Tuition.
 Public URL: https://dashboard.jawsdb.com/mysql/dashboard/databites/51ca8ad9-8cd0-45ff-8a03-53d62fd0a887
 ![student](https://user-images.githubusercontent.com/8236854/37642865-b15c5028-2c59-11e8-82e3-67de84bc0803.png)
### Teacher :- Contains the teacher_id for all the teachers in the tuition.
Public URL:  https://dashboard.jawsdb.com/mysql/dashboard/databites/51ca8ad9-8cd0-45ff-8a03-53d62fd0a887
![teach](https://user-images.githubusercontent.com/8236854/37642922-e449e0ae-2c59-11e8-9922-7b49a07bee9b.png)
If a teacher makes request with the teacher id which is not mentioned in the teacher table.He will receive a message Teacher(s) not found.
So the application will only for the teacher_id mentioned below: -
•	teacherbenny@gmail.com
•	teacherjohny@gmail.com
•	teacherkenny@gmail.com
•	teachermikey@gmail.com
### Registrationdetails :- Contains  the students(Student_id) registered to a particular teacher       (Teacher_id) and suspension_status signifies whether the student is still registered.
If the suspension status is true that means the students has been suspended and he wont be able to receive notification from teacher.
Public URL:https://dashboard.jawsdb.com/mysql/dashboard/databites/51ca8ad9-8cd0-45ff-8a03-53d62fd0a887
![reg](https://user-images.githubusercontent.com/8236854/37642972-0fc2d8bc-2c5a-11e8-9bbc-d781e968cbd0.png)
The application is deployed on heroku and can be accessed on the 
https://tuitionpoint.herokuapp.com/
The application is designed in such a way that it will handle requests from below mentioned URLs if we try to access it from a different  URL  a message 404 not found will be displayed.
### A teacher can Register a student 
https://tuitionpoint.herokuapp.com/api/register
![regiterrrrrr](https://user-images.githubusercontent.com/8236854/37643102-6ded2906-2c5a-11e8-9689-b48812c2ecce.png)
If a teacher tries to register with a teacher id which is not in the teacher table he will receive a message Teacher not found
![not found](https://user-images.githubusercontent.com/8236854/37643179-b1b23df2-2c5a-11e8-8420-cf58b389eaaf.png)
### A teacher can Suspend a student 
https://tuitionpoint.herokuapp.com/api/suspend
![suspend](https://user-images.githubusercontent.com/8236854/37643268-e4eb85f2-2c5a-11e8-9e58-16d994eb3857.png)
### A teacher can get a student list of common students for two teachers atmost
https://tuitionpoint.herokuapp.com/api/commonstudents?teacher=teacherkenny%40gmail.com
![common](https://user-images.githubusercontent.com/8236854/37643284-f0c8fd82-2c5a-11e8-8b11-7298c32fa715.png)
### A teacher can retrieve all student emails that can receive notifications from a teacher's email
![notification](https://user-images.githubusercontent.com/8236854/37643318-113e6dc2-2c5b-11e8-81c5-22fcf5362d5a.png)
### The application is tested for all the service endpoints  and you can find all the test case in folder Test. (Using chai and mocha)
![test](https://user-images.githubusercontent.com/8236854/37643356-3078451e-2c5b-11e8-92ac-3eff04e52ddb.png)





