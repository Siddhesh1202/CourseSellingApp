const { Router } = require("express");
const { purchaseModel, userModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const userRouter = Router();
const {userMiddleware} = require("../middleware/user");
const  { JWT_USER_PASSWORD } = require("../config");

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

userRouter.post("/signin",async function(req, res) {
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email,
        password: password
    }); //[]

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId: userId
    })
    
    const courseData = await courseModel.find({
        _id: {
            $in: purchases.map((purchase) => purchase.courseId)
        }
    })
    res.json({
        message: "All Purchases",
        purchases,
        courseData
    })
})

module.exports = {
    userRouter: userRouter
}