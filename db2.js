const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "info123"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");

    // Create Database
    con.query("CREATE DATABASE IF NOT EXISTS jsDB1", (err) => {
        if (err) throw err;
        console.log("Database created");

        // Use Database
        con.query("USE jsDB1", (err) => {
            if (err) throw err;

            // Drop table if it already exists
            con.query("DROP TABLE IF EXISTS alia", (err) => {
                if (err) throw err;

                // Create Table
                const createTable = `
                CREATE TABLE alia(
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(20),
                    address VARCHAR(20)
                )`;

                con.query(createTable, (err) => {
                    if (err) throw err;
                    console.log("Table created");

                    // Insert Records
                    const insertData = `
                    INSERT INTO alia(name,address)
                    VALUES
                    ('sanjay','new delhi'),
                    ('maya','mysore'),
                    ('sanju','bangalore'),
                    ('manju','mangalore')
                    `;

                    con.query(insertData, (err) => {
                        if (err) throw err;
                        console.log("Records inserted");

                        // Select All
                        con.query("SELECT * FROM alia", (err, result) => {
                            if (err) throw err;
                            console.log(result);

                            // Select One
                            con.query("SELECT * FROM alia WHERE id=1", (err, result) => {
                                if (err) throw err;
                                console.log(result);

                                // Delete Record
                                con.query("DELETE FROM alia WHERE id=2", (err, result) => {
                                    if (err) throw err;
                                    console.log("Record deleted");
                                    console.log(result);

                                    // Add Column
                                    con.query("ALTER TABLE alia ADD phone_number VARCHAR(15)", (err) => {
                                        if (err) throw err;
                                        console.log("New column added");

                                        // Drop Column
                                        con.query("ALTER TABLE alia DROP COLUMN phone_number", (err) => {
                                            if (err) throw err;
                                            console.log("Column dropped");

                                            // Update Record
                                            con.query("UPDATE alia SET name='mamtha' WHERE id=3", (err) => {
                                                if (err) throw err;
                                                console.log("Record updated");

                                                // Remove AUTO_INCREMENT
                                                con.query("ALTER TABLE alia MODIFY id INT NOT NULL", (err) => {
                                                    if (err) throw err;

                                                    // Drop Primary Key
                                                    con.query("ALTER TABLE alia DROP PRIMARY KEY", (err) => {
                                                        if (err) throw err;
                                                        console.log("Primary key dropped");

                                                        // Drop Table
                                                        con.query("DROP TABLE alia", (err) => {
                                                            if (err) throw err;
                                                            console.log("Table dropped");

                                                            con.end();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});