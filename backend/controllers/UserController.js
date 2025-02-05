const User = require('../models/User')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController{
    static async register(req, res){
        const {name, email, phone, password, confirmpassword} = req.body

        if(!name){
            res.status(422).json({message: 'Name is required'})
            return
        }
        if(!email){
            res.status(422).json({message: 'Email is required'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'Phone is required'})
            return
        }
        if(!password){
            res.status(422).json({message: 'Password is required'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'Confirmed password is required'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'Password and confirmed password need to be equal'})
            return
        }

        const userExists = await User.findOne({email: email})

        if(userExists){
            res.status(422).json({
                message: 'Email already exists! Please, choose another one'
            })
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name: name, 
            email: email,
            phone: phone,
            password: passwordHash
        })

        try{
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        }catch(error){
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const {email, password} = req.body
        if(!email){
            res.status(422).json({message: 'Email is required'})
            return
        }
        if(!password){
            res.status(422).json({message: 'Password is required'})
            return
        }

        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({
                message: 'There is no user registered with this email address! Please register to create an account'
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({
                message: 'Invalid password!'
            })
            return
        }
        await createUserToken(user, req, res)
    }

    static async checkUser(req, res){
        let currentUser

        console.log(req.headers.authorization)

        if(req.headers.authorization){
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')
            console.log(decoded)
            currentUser = await User.findById(decoded.id)
            console.log(currentUser)
            currentUser.password = undefined
        }else{
            currentUser = null
        }
        res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id
        const user = await User.findById(id).select('-password')

        if(!user){
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }
        res.status(200).json({user})
    }

    static async editUser(req, res){
        const id = req.params.id

        // check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)
        
        const {name, email, phone, password, confirmpassword} = req.body

        if(req.file){
            user.image = req.file.filename
        }

        // validations
        if(!name){
            res.status(422).json({message: 'Name is required'})
            return
        }
        if(!email){
            res.status(422).json({message: 'Email is required'})
            return
        }

        const userExists = await User.findOne({email:email})
        
        //check if user exists
        if(user.email !== email && userExists){
            res.status(422).json({
                message: 'Please, use email'
            })
            return
        }
        user.email = email
        
        if(!phone){
            res.status(422).json({message: 'Phone is required'})
            return
        }

        user.phone = phone

        if(password !== confirmpassword){
            res.status(422).json({message: 'Password is wrong'})
            return
        }else if(password === confirmpassword && password != null) {
            //creating password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }
        
        try{
            //returns user updated data
            await User.findByIdAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true}
            )
            res.status(200).json({
                message: 'User updated successfully!'
            })
        }catch(err){
            res.status(500).json({message: err})
            return
        }
    }
}