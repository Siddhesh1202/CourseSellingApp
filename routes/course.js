const Router = require("express");
const { purchaseModel, courseModel } = require("../db");
const {userMiddleware} = require("../middleware/user");
const courseRouter = Router();


courseRouter.post("/purchase", userMiddleware, async function(req, res){
    const userId = req.userId;
    const courseId = req.body.courseId;
    const course = await purchaseModel.findOne({
        userId: userId,
        courseId: courseId
    })
    if (course){
        return res.status(403).json({
            message: "Already Purchased"
        })
    }
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })
    res.json({
        message: "Course Purchase Complete"
    })
})

courseRouter.get("/preview", async function(req, res){
    const courses = await courseModel.find({
    })


    res.json({
        message: "Get All Courses",
        courses
    })
})


module.exports = {
    courseRouter : courseRouter
}