const { Router } = require("express");
const {adminModel, courseModel} = require("../db")
const adminRouter = Router();
const {adminMiddleware} = require("../middleware/admin")
// adminRouter.use(adminMiddleware);
const jwt = require("jsonwebtoken");
const  { JWT_ADMIN_PASSWORD } = require("../config");

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

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

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

adminRouter.put("/createCourse", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const {title, desciption, imageUrl, price, courseId} = req.body;
    
    const course = await courseModel.updateOne({
        _id: courseId,
        createrId: adminId
    },{
        title: title,
        description: desciption,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "updated Course"
    })
})

adminRouter.get("/getAllCourses", adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const {title, desciption, imageUrl, price, courseId} = req.body;
    
    const course = await courseModel.find({
        createrId: adminId
    })

    res.json({
        message: "Get All Courses"
    })
})

module.exports = {
    adminRouter: adminRouter
}