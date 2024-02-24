const express = require("express");


let router = express.Router();


router.get("/login", (req, res) => {
    res.render("page", { page: "login" });
});


router.get("/cadastro", (req, res) => {
    res.render("page", { page: "cadastro" });
})


module.exports = router;