INSERT INTO departments (department_name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Fnance"),
    ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 160000, 3),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO employees( first_name, last_name, role_id, manager_id)
VALUES
    ("Liz", "Erd", 1, NULL),    
    ("Teri", "Dactyl", 2, NULL),    
    ("Frank", "Furter", 2, 2),    
    ("Barb", "Akew", 3, NULL),    
    ("Dee", "End", 3, 4),    
    ("Anne", "Teak", 4, NULL),    
    ("Rod", "Knee", 4, 6);
    
