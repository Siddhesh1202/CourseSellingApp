const { Router } = require("express");
const {adminModel} = require("../db")
const adminRouter = Router();
// adminRouter.use(adminMiddleware);
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "alsiwjendi";


adminRouter.post("/signup", async function(req, res){
    const {email, password, firstName, lastName} = req.body; // TODO: Add zod valdiation
    // TODO: Hash the password using Bcrypt 
    // Add try catch block
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Signup Complete"
    })
})

adminRouter.post("/signin", async function(req, res){
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if (admin){
        const token = jwt.sign({
            id: user._id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.post("/createCourse", function(req, res){
    res.json({
        message: "Create Course"
    })
})

adminRouter.put("/createCourse", function(req, res){
    res.json({
        message: "Create Course"
    })
})

adminRouter.get("/getAllCourses", function(req, res){
    res.json({
        message: "Get All Courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}