const express = require("express");
const session = require("express-session");
const app = express();

const radioRoutes = require("./routes/radioRoutes");
const usersRoutes = require("./routes/usersRoutes");

const port = 3001;

//Middleware
app.use(express.json());
app.use(
    session({
        secret: "radio",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: "auto" },
    })
);

app.use("/api", radioRoutes);
app.use("/api/users", usersRoutes);


app.listen(port, err => {
    if (err) return console.log(err);
    console.log(`Listening on port ${port}`);
})