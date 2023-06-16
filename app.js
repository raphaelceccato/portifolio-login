const express = require('express');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.redirect("login");
});


app.get("/login", (req, res) => {
    return res.render("login");
});

app.get("/account", (req, res) => {
    return res.render("account");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
