const model = require("../models");
require('dotenv').config()

const { Country } = model;
const jwt = require('jsonwebtoken')

module.exports = {
    getAllCountry: async (req, res) => {
        const countries = await Country.findAll();

        if (countries){
            res.status(200).json(countries);
        } else {
            res.status(204).json({ message: "Country is empty" });
        }
    },

    addCountry: async (req, res) => {
        const auth = await req.headers.authorization;
        if (auth) {
            const token = await auth.split(" ")[1];
            const verified = jwt.verify(token, process.env.JWTKEY);

            if (verified && verified.isAdmin == true) {
                const duplicate = await Country.findOne({
                    where: { 
                        name: req.body.name 
                    }
                });

                if (duplicate) {
                    res.status(409).json({
                        message: "Country already exists",
                    });
                } else {
                    const data = await req.body;
                    await Country.create({
                        name: data.name,
                    });
                    res.status(201).json({ message: "Country created" });
                }
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            res.status(401).json({ message: "Token Required" });
        }
    },
    
    getCountryById: async (req, res) => {
        const country = await Country.findOne({ 
            where: { 
                id: req.params.id 
            } 
        });

        if (country) {
            res.status(200).json(country);
        } else {
            res.status(404).json({ message: "Country does not exist" });
        }
    },

    updateCountryById: async (req, res) => {
        const auth = await req.headers.authorization;
        if (auth) {
            const id = req.params.id;
            const token = await auth.split(" ")[1];
            const verified = jwt.verify(token, process.env.JWTKEY);

            if (verified && verified.isAdmin == true) {
                const data = await req.body;

                await Country.update({
                    name: data.name,
                },{
                    where: {
                        id: id
                    }
                });
                res.status(201).json({ message: "Country updated" });
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            res.status(401).json({ message: "Token required" });
        }
    },

    deleteCountryById: async (req, res) => {
        const auth = await req.headers.authorization;
        if (auth) {
            const id = req.params.id;
            const token = await auth.split(" ")[1];
            const verified = jwt.verify(token, process.env.JWTKEY);

            if (verified && verified.isAdmin == true) {
                await Country.destroy({
                    where: {
                        id: id
                    }
                });
                res.status(201).json({message: "Country deleted"});
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            res.status(401).json({ message: "Token required" });
        }
    }
};
