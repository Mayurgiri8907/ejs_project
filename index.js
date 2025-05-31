const express = require('express');
const path = require('path');
const usermodel = require('./models/usermodel');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
 
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs');

app.get("/", (req,res) => {
    res.render("index");
})
app.post("/create", async function(req,res){
    let {name,email} = req.body;
    let usercreat = await usermodel.create({
        name : name,
        email : email
    })
    res.redirect("/show");
})
app.get("/show", async (req,res) => {
    let showuser = await usermodel.find();
    res.render("show",{showuser}) 
})
app.get("/delete/:id", async (req,res) => {
    let showuser = await usermodel.findOneAndDelete({_id : req.params.id});
    res.redirect("/show");
})
app.get("/edit/:userid", async (req,res) => {
    let edituser = await usermodel.findOne({_id : req.params.userid});
    res.render("edit",{edituser})
})
app.post("/update/:userid", async (req,res) => {
    let {name,email,file} = req.body;
    let updateuser = await usermodel.findOneAndUpdate({_id : req.params.userid},{name,email},{new : true});
    res.redirect("/show");
})
app.listen(port);