require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require('./core/connectDB')
const courseRouter = require("./routers/lesson.router");
const blogsRouter = require('./routers/blogs.router')
const studentRouter = require('./routers/student.router');
const AuthRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin.router");
const postRouter = require("./routers/post.router");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors("*"));
connectDb()
const api = `/api/v1`

app.use(`${api}/auth`, AuthRouter);
app.use(`${api}/blogs`, blogsRouter)
app.use(`${api}/courses`, courseRouter);
app.use(`${api}/student`, studentRouter);
app.use(`${api}/admin`, adminRouter);
app.use(`${api}/posts`, postRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`PORT: ${PORT}`));