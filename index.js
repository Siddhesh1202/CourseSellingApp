const express = require("express");

const app = express();

app.post("/user/signup", function(req, res){
    res.json({
        message: "Signup Complete"
    })
})

app.post("/user/signin", function(req, res){
    res.json({
        message: "Signin Complete"
    })
})

app.get("/user/purchases", function(req, res){
    res.json({
        message: "All Purchases"
    })
})

app.post("/course/purchase", function(req, res){
    res.json({
        message: "Course Purchase Complete"
    })
})

app.get("/Courses", function(req, res){
    res.json({
        message: "All Courses"
    })
})
