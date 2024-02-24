const express = require("express");
const Account = require("../models/Account.js");
const bcrypt = require("bcrypt");


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


router.get("/logout", (req, res) => {
    delete req.session.user;
    res.redirect("/login");
});


router.post("/login", (req, res) => {
    const user = req.body.usuario ?? "";
    const password = req.body.senha ?? "";

    Account.findOne({ where: { user: user }})
    .then(async acc => {
        let success = false;

        if (acc) {
            success = await bcrypt.compare(password, acc.password);
        }

        if (success) {
            req.session.user = user;
            req.session.email = acc.email;
            res.json({success: true});
        } else {
            delete req.session.user;
            res.json({success: false, error: "Conta e/ou senha incorreta(s)"});
        }
    })
    .catch(err => {
        res.json({success: false, error: err.toString()});
    });
});


router.post("/cadastro", async (req, res) => {
    const user = req.body.usuario ?? "";
    const password = req.body.senha ?? "";
    const email = req.body.email ?? "";

    if (user.length < 5 || user.length >= 15) {
        res.json({success: false, error: "O campo de usuário deve ter entre 5 e 15 caracteres"});
    }
    else if (password.length < 5 || password.length >= 15) {
        res.json({ success: false, error: "O campo de senha deve ter entre 5 e 15 caracteres" });
    }
    else if (!(/^[\w\d\_\-\.]+@[\w\d\_\-]+\.(([\w\d]+$)|([\w\d]+\.[\w\d]+$))/).test(email)) {
        res.json({ success: false, error: "Insira um e-mail válido"});
    }
    else if (await Account.count({where: {user: user}}) > 0) {
        res.json({ success: false, error: "Este usuário já está cadastrado no sistema" });
    }
    else if (await Account.count({where: {email: email}}) > 0) {
        res.json({ success: false, error: "Este e-mail já está cadastrado no sistema" });
    }
    else {
        Account.create({ user, password: await bcrypt.hash(password, 10), email})
        .then(result => {
            if (result)
                res.json({success: true});
            else
                res.json({success: false, error: "Erro desconhecido ao criar a conta"});
        })
        .catch(err => {
            res.json({success: false, error: err.toString()});
        });
    }
});


module.exports = router;