require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require('./core/connectDB')

const courseRouter = require("./routers/lesson.router");
const studentRouter = require('./routers/student.router');
const AuthRouter = require("./routers/auth.router");
const adminRouter = require("./routers/admin.router");
const postRouter = require("./routers/post.router");
const requestRouter = require("./routers/request.router");
const withdrawRouter = require("./routers/withdraw.router");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors("*"));

app.get('/', (req,res)=>{
    res.status(200).json("OK")
})

const api = `/api/v1`;
app.use(`${api}/auth`, AuthRouter);
app.use(`${api}/courses`, courseRouter);
app.use(`${api}/student`, studentRouter);
app.use(`${api}/admin`, adminRouter);
app.use(`${api}/posts`, postRouter);
app.use(`${api}/requests`, requestRouter);
app.use(`${api}/withdraw`, withdrawRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    connectDb();
    console.log(`Connected port: ${PORT} 🚀`);
});