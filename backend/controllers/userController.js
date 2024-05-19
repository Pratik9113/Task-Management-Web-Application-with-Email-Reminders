import curruser from "../models/userModules.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
// login user 

const loginUser = async(req,res) =>{
    const {email,password} = req.body;
    try {
        const user = await curruser.findOne({email})
        if(!user){
            return res.json({success : false, message : "user doesnot exit"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false , message : "invalid password"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message: "error"})
    }
}

const createToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}



const registerUser = async (req,res) =>{
    const {name,password,email} = req.body;
    try {
        const exists = await curruser.findOne({email});
        if(exists){
            return res.json({success:false , message: "user already exits"})
        }

        if(!validator.isEmail(email)){
            return res.json({success : false, message : "enter valid email"})
        }

        if (password.length < 8){
            return res.json({success : false , message : "please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new curruser ({
            name : name,
            email:email,
            password : hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success : true,token});
    } catch (error) {
        console.log(error);
        res.json({success : false,message:"error"})
    }
}

export {loginUser,registerUser}