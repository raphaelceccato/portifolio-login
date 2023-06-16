const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    return res.redirect("login");
});

app.get("/login", (req, res) => {
    return res.render("main", {page: "login"});
});

app.get("/account", (req, res) => {
    return res.render("login", {page: "account"});
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
