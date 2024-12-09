const User = require('../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../helpers/create-user-token')

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
}