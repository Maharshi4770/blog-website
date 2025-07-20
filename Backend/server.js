require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const { userRouter } = require("./Routes/user")
const { postRouter } = require("./Routes/post")

app.use(express.json());

app.use("/api/auth",userRouter);
app.use("/api/post",postRouter);

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log('Listeningn on port 3000')

}
main()  