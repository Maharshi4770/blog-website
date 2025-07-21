const { Router } = require('express');
const { z } = require('zod')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel, postModel} = require('../db')
const { JWT_USER_SECRET } = require('../config')
const { userMiddleware } = require('../Middleware/user')

const userRouter = Router();

userRouter.post("/signup",async function(req,res){
    
    const requirebody = z.object({
        email: z.email().max(30),
        firstName: z.string().min(3).max(15),
        lastName: z.string().min(3).max(15),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(13, { message: 'Password must be at most 13 characters long' })
            .refine(val => /[a-z]/.test(val), {
                message: 'Must include a lowercase letter',
            })
            .refine(val => /[A-Z]/.test(val), {
                message: 'Must include an uppercase letter',
            })
            .refine(val => /[^A-Za-z0-9]/.test(val), {
                message: 'Must include a special character',
            }),
    })

    const {success, error, data} = requirebody.safeParse(req.body);

    if(!success){
        return res.json({
            msg: 'Incorrect Format',
            error
        })
    }

    const {email, firstName, lastName ,password} = req.body;

    try{
        const hashedpassword = await bcrypt.hash(password,7);
        await userModel.create({
            email,
            firstName,
            lastName,
            password: hashedpassword
        })

        res.json({
            msg: 'User signedUp'
        })
    }catch(e){
        res.status(403).json({
            msg: 'User already exists'
        })
    }
})

userRouter.post("/signin",async function(req,res){
    const { email, password} = req.body;

    const user = await userModel.findOne({
        email: email,
    })

    if(!user){
        res.status(203).json({
            msg: 'User is not available',
        })
        return;
    }

    const passwordmatch = await bcrypt.compare(password, user.password);

    if(passwordmatch){
        const token = jwt.sign(
            {
                id: user._id,
            },
            JWT_USER_SECRET
        );  
        res.json({token: token, firstName: user.firstName})
    }else{
        res.json({
            msg: 'Incorrect login credentials',
        });
    }
});


// This route is for previewing all posts (public)
userRouter.get("/preview", async (req, res) => {
    try {
        const blogs = await postModel.find({});
        res.json({ blogs });
    } catch (e) {
        res.status(500).json({ msg: 'Error fetching posts' });
    }
});


module.exports = {
    userRouter
}