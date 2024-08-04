

const asyncHandler = require("express-async-handler")
const {prisma} = require("../config/prismaConfig")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;
// const { PrismaClient } = require("@prisma/client");


const createUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    try {
        const userExists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!userExists) {
            // Hash the password before saving the user
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create the user with the hashed password
            const user = await prisma.user.create({
                data: {
                    ...req.body,
                    password: hashedPassword
                }
            });

            res.status(200).send({ message: "User Created Successfully", user });
        } else {
            res.status(409).send({ message: "User already registered with this email" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    let user = await prisma.user.findFirst({where: {email:email}})

    if(!user) {
        throw error("User not found")
    }
    if(!bcrypt.compareSync(password,user.password)) {
        throw Error ("Incorrect Password")
    }

    const token = jwt.sign({userId: user.id},jwtSecret)
    res.json({user,token})
})


module.exports = {createUser,login}