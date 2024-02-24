const express = require("express");


let router = express.Router();


router.get("/", (req, res) => {
    res.render("page", { page: "index" });
});


module.exports = router;