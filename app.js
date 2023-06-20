const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: '4742338820204490440'
}));


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
