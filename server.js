const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());
app.use(express.static("public")); 


// Home route to serve the main index.html page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/users", async (req, res) => {
  try {
    // Query all rows from the "user_profiles" table
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users");
  }
});

//route to fetch all alumni profiles from the database
app.get("/alumni", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alumni_profiles");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching alumni profiles");
  }
});

//route to fetch all user profiles from the database
app.post("/create-user", async (req, res) => {
  try {
    const {email, password, first_name, last_name} = req.body;

    const result = await pool.query(
      `INSERT INTO users (id, email, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [email, password, first_name, last_name]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
});

//updats the user for the information
app.put("/update-user", async (req, res) => {
  try {
    const { id, email, password, first_name, last_name } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET email = $1,
           password = $2,
           first_name = $3,
           last_name = $4
       WHERE id = $5
       RETURNING *`,
      [email, password, first_name, last_name, id]
    );

    //sends back updated jason
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user");
  }
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
