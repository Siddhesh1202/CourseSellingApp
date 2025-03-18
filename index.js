const express = require("express");
const {userRouter} = require("./user");
const {courseRouter} = require("./course");
const {adminRouter} = require("./admin")
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(4000);
