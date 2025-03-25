const { Router } = require("express");
const {adminModel, courseModel} = require("../db")
const adminRouter = Router();
const {adminMiddleware} = require("../middleware/admin")
// adminRouter.use(adminMiddleware);
const jwt = require("jsonwebtoken");


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
            id: admin._id
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

adminRouter.post("/createCourse", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const {title, desciption, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title: title,
        description: desciption,
        imageUrl: imageUrl,
        price: price,
        createrId: adminId
    })

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