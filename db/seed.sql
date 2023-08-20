
INSERT INTO Departments ( Department) VALUES
  ( 'Analytics'),
  ( 'Sales'),
  ( 'Engineering'),
  ( 'Human Resources'),
  ( 'Health & Safety'),
  ( 'Customer Service'),
  ( 'Production'),
  ( 'Design'),
  ( 'Accounting'),
  ( 'Acquisition');


INSERT INTO Roles (Title, Salary, Department_id) VALUES
  ('CEO', 837000, 10),
  ('Marketing Advisor', 75000, 4),
  ('Lead Software Engineer', 137000, 3),
  ('Product Handler', 23874, 8),
  ('Business Development Agent', 42000, 7),
  ('OH&S Officer', 52000, 5),
  ('Project Lead', 75000, 8),
  ('Data Analyst', 60000, 1),
  ('Sales Associate', 110000, 2),
  ('Charter Accountant', 125000, 9),
  ('HR Representative', 41000, 4),
  ('Front-End Developer', 75000, 7),
  ('Lawyer', 142000, 10),
  ('CFO', 231000, 9);


INSERT INTO Employees ( First_Name, Last_Name, Role_id, Manager_id) VALUES
  ( 'John', 'JongleheimerSchmidt', 1, NULL),
  ( 'Joan', 'Rivers', 2, NULL),
  ( 'Alice', 'Slooooon', 3, NULL),
  ( 'Verica', 'Eureka', 4, NULL),
  ( 'Cliff', 'McGinty', 5, NULL),
  ( 'Jeff', 'Elstein', 6, NULL),
  ( 'Barb', 'Longlip', 7, NULL),
  ( 'Margery', 'Simps', 8, NULL),
  ( 'Gregory', 'Bellsabob', 9, NULL),
  ( 'Jackie', 'Twoteeth', 10, NULL),
  ( 'Montgomery', 'Welldone', 11, NULL),
  ( 'Philip J.', 'Fish', 12, NULL),
  ( 'John', 'Zoidbergus', 13, NULL),
  ( 'Turanga', 'Leela', 14, NULL),
  ( 'Reagan', 'Nyght', 4, NULL),
  ( 'Sloan', 'Kripe', 14, NULL),
  ( 'Alexander', 'Schmidt', 4, NULL);
