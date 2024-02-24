const express = require("express");


let router = express.Router();


router.get("/", (req, res) => {
    let sess = req.session;
    res.render("page", { page: "index", usuario: sess.user, email: sess.email });
});


module.exports = router;