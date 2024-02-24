const express = require("express");


let router = express.Router();


router.get("/login", (req, res) => {
    res.render("page", { page: "login" });
});


router.get("/cadastro", (req, res) => {
    res.render("page", { page: "cadastro" });
});


router.get("/cadastro/concluido", (req, res) => {
    res.render("page", { page: "cadastro_ok" });
});


module.exports = router;