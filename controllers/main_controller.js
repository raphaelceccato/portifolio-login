const express = require("express");


let router = express.Router();


router.get("/", (req, res) => {
    res.render("page", { page: "index", usuario: req.session.usuario });
});


module.exports = router;