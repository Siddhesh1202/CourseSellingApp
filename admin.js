const { Router } = require("express");

const adminRouter = Router();
adminRouter.use(adminMiddleware);

adminRouter.post("/signup", function(req, res){
    res.json({
        message: "Signup Complete"
    })
})

adminRouter.post("/signin", function(req, res){
    res.json({
        message: "Signin Complete"
    })
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