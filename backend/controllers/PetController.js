const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class PetController{
    //create pet
    static async create(req, res){
        const {name, age, weight, color} = req.body
        const available = true
        
        //images upload
        const images = req.files
        console.log(images)
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
        const user = getUserByToken(token)

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
                message: 'Pet cadastrado com sucesso!',
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
}
