const express = require("express");
const app = express();
const pool = require("./db"); 

app.use(express.json());
app.use(express.static("public")); 

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send("Error fetching users");
    }
});

app.get("/alumni", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM alumni_profiles");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching alumni:", err);
        res.status(500).send("Error fetching alumni");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
