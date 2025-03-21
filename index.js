const express = require("express");
const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin");
const { default: mongoose } = require("mongoose");
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main(){
    await mongoose.connect("mongodb+srv://sd1386:Cricket123@cluster0.n01q7.mongodb.net/coursera-app");
    app.listen(4001);
    console.log("Success");
}

main();


