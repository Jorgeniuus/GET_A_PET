const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId
module.exports = class PetController{
    //create pet
    static async create(req, res){
        const {name, age, weight, color} = req.body
        const available = true
        
        //images upload
        const images = req.files
    
        //validations
        if(!name){
            res.status(422).json({message: 'Name is required!'})
            return
        }
        if(!age){
            res.status(422).json({message: 'Age is required!'})
            return
        }
        if(!weight){
            res.status(422).json({message: 'Weight is required!'})
            return
        }
        if(!color){
            res.status(422).json({message: 'Color is required!'})
            return
        }

        if(images.length === 0){
            res.status(422).json({message: 'Image is required!'})
            return
        }

        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create pet
        const pet = new Pet({
            name: name,
            age: age,
            weight: weight,
            color: color,
            available: available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try{
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet registered successfully!',
                newPet
            })
        }catch(error){
            res.status(500).json({messa: error})
        }
    }
    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets
        })
    }
    static async getAllUserPets(req, res){
        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets
        })
    }
    static async getAllUserAdoptions(req, res){
        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({
            pets
        })
    }
    static async getPetById(req, res){
        const id = req.params.id

        //check if id is valid
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'Invalid Id'})
            return
        }

        //check if pet exists
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet not found!'})
            return
        }

        res.status(200).json({
            pest: pet
        })
    }
    static async removePetById(req, res){
        const id = req.params.id

        //check if id is valid
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: 'Invalid sId'})
            return
        }

        //check if pet exists
        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet not found!'})
            return
        }

        //check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({
                message: 'There was a problem. Please try again later'
            })
        }

        await Pet.findByIdAndDelete(id)
        res.status(200).json({message: 'Pet removed successfully'})

    }
}
