const { Router } = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const userRouter = Router();

userRouter.post("/signup", async function(req, res){
    const {email, password, firstName, lastName} = req.body; // TODO: Add zod valdiation
    // TODO: Hash the password using Bcrypt 
    // Add try catch block
    await userModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Signup Complete"
    })
})

userRouter.post("/signin", async function(req, res){
    const {email, password} = req.body;
    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if (user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token,
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

userRouter.get("/purchases", async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId: userId
    })

    res.json({
        message: "All Purchases",
        purchases
    })
})

module.exports = {
    userRouter: userRouter
}