const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const main_controller = require("./controllers/main_controller.js");
const auth_controller = require("./controllers/auth_controller.js");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    secret: '4742338820204490440'
}));
app.use(express.json());


app.use("/", main_controller);
app.use("/", auth_controller)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
