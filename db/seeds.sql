INSERT INTO department(id, name)
VALUES
(1, "Art"),
(2, "Science"),
(3, "Foreign Language"),
(4, "Math"),
(5, "History");
   

INSERT INTO roles 
VALUES
(1, "Junior Science Teacher", 12000, 2),
(2, "Senior Science Teacher", 18000, 2),
(3, "Junior Language Teacher", 13000, 3),
(4, "Senior Language Teacher", 20000, 3),
(5, "Junior History Teacher", 12000, 5),
(6, "Senior History Teacher", 15000, 5),
(7, "Junior Art Teacher", 11000, 1),
(8, "Senior Art Teacher", 15000, 1),
(9, "Junior Math Teacher", 15000, 4),
(10, "Senior Math Teacher", 20000, 4);


INSERT INTO employees( id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Gayle", "Lennox",1, 1),
(2, "Maureen", "Kenny", 2, 2),
(3, "Nate", "Watson", 1, 3),
(4, "Adam", "McQueen", 2, 4),
(5, "Doug", "Siegal", 1, 5),
(6, "Erin", "Mahoney", 10, 6),
(7, "Nancy", "Abens", 8, 7),
(8, "Barbara", "Brown", 4, 8),
(9, "Patrick", "McGee-Jenks",5, 9);