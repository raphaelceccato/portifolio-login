const express = require("express");


let router = express.Router();


router.get("/", (req, res) => {

});


router.get("/login", (req, res) => {

})


router.post("/login", (req, res) => {
    let s = req.session;
})