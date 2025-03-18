const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", function(req, res){
    res.json({
        message: "Signup Complete"
    })
})

userRouter.post("/signin", function(req, res){
    res.json({
        message: "Signin Complete"
    })
})

userRouter.get("/purchases", function(req, res){
    res.json({
        message: "All Purchases"
    })
})

module.exports = {
    userRouter: userRouter
}