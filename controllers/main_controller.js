const express = require("express");
const Auth = require("../utils/auth.js");

const PUBLIC_PAGES = new Set(["/", "/login", "/logout"]);


let router = express.Router();


function checkLogin(req, res, next) {
    if (PUBLIC_PAGES.has(req.path) || Auth.isLoggedIn(req.session))
        next();
    else
        res.redirect("/login");
}

router.use(checkLogin);


router.get("/", (req, res) => {
    return res.redirect("/login");
});


router.get("/login", (req, res) => {
    return res.render("main", { page: "login" });
});


router.post("/login", (req, res) => {
    let s = req.session;
    if (Auth.isLoggedIn(s))
        Auth.logout(s);
    let username = (req.body.user ?? "");
    let password = (req.body.pwd ?? "");
    Auth.login(username, password)
    .then((result) => {
        if (result == "ok")
            res.redirect("/account");
        else
            res.render("main", { page: "login", msg: result });
    }).catch((error) => {
        res.render("main", { page: "login", msg: "An error has occurred" });
    });
});


module.exports = router;