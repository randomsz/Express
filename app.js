const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 80;

//for serving static files
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//set the view engin
app.set('view engine', 'pug')

//for seting views directory
app.set("views", path.join(__dirname, "view"))

//our end point for pug template

app.get("/",(req, res)=>{
    console.log("in get");
    res.status(200).render("index");
});

app.post("/",(req,res)=>{
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const more = req.body.more;
    const phone = req.body.phone;
    // output = "dsdsadsadsad";
    const output = `The new customer is ${name} he is a ${gender}, ${age} years old. his phone number is ${phone} He/She resides at ${address}.Here is more abot him ${more}`;
    fs.writeFileSync("output.txt", output);

    const params = {"msg":"form is submitted sucessfully"};
    res.render("index.pug",params)
});


app.listen(port, ()=>{
    console.log(`application started successfully on port ${port}`);
})

