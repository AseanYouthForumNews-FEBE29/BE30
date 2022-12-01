const model = require('../models')
require('dotenv').config()

const { User, UserDetail, Country } = model
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize")
const imgbbUploader = require('imgbb-uploader')

module.exports = {
    getAllUser: async(req, res) => {
        const auth = await req.headers.authorization
        const token = await auth.split(" ")[1]

        const verified = jwt.verify(token, process.env.JWTKEY)

        if (verified){
            if (verified.id == 1){
                const users = await UserDetail.findAll({
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['password']
                        }
                    },
                    {
                        model: Country
                    }],
                    where: {
                        id: {
                            [Op.ne]: 1
                        }
                    }
                })
        
                res.status(200).json({users})
            } else {
                res.status(401).json({message: "Admin Only"})
            }
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    },

    updateUserById: async(req, res) => {
        const auth = await req.headers.authorization
        const token = await auth.split(" ")[1]

        const verified = jwt.verify(token, process.env.JWTKEY)

        if(verified){

            const uploaded_image = await req.file
            const name_uploaded_image = uploaded_image.originalname.split(".")[0]+ '-' + new Date().getTime()

            const options = {
                apiKey: process.env.IMGBBKEY,
                name: name_uploaded_image,
                base64string: uploaded_image.buffer.toString('base64')
            }

            const response = await imgbbUploader(options)
                .then((res) => {
                    return res.url
                }
            )

            const data = await req.body
            const saltRounds = 10

            const hash = bcrypt.hashSync(data.password, saltRounds)
            data.password = hash
            
            await User.update({
                email: data.email,
                password: data.password
            }, {
                where: {
                    id: verified.id
                }
            })

            await UserDetail.update({
                fullName: data.fullName,
                Image: response
            }, {
                where: {
                    userId: verified.id
                }
            })

            res.status(201).json({message: "Update success"})
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    }
}