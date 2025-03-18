const Router = require("express");

const courseRouter = Router();


courseRouter.post("/purchase", function(req, res){
    res.json({
        message: "Course Purchase Complete"
    })
})

courseRouter.get("/preview", function(req, res){
    res.json({
        message: "All Courses"
    })
})


module.exports = {
    courseRouter : courseRouter
}