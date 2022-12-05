const model = require("../models");
require('dotenv').config()

const { Category } = model;
const jwt = require('jsonwebtoken')

module.exports = {
    getAllCategory: async (req, res) => {
        const categories = await Category.findAll();

        if (categories){
            res.status(200).json(categories);
        } else {
            res.status(204).json({ message: "Category is empty" });
        }
    },

    addCategory: async (req, res) => {
        const auth = await req.headers.authorization;
        if (auth) {
            const token = await auth.split(" ")[1];
            const verified = jwt.verify(token, process.env.JWTKEY);

            if (verified && verified.isAdmin == true) {
                const duplicate = await Category.findOne({
                    where: { 
                        name: req.body.name 
                    }
                });

                if (duplicate) {
                    res.status(409).json({
                        message: "Category already exists",
                    });
                } else {
                    const data = await req.body;
                    await Category.create({
                        name: data.name,
                    });
                    res.status(201).json({ message: "Category created" });
                }
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            res.status(401).json({ message: "Token Required" });
        }
    },
    
    getCategoryById: async (req, res) => {
        const category = await Category.findOne({ 
            where: { 
                id: req.params.id 
            } 
        });

        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ message: "Category does not exist" });
        }
    },

    updateCategoryById: async (req, res) => {
        const auth = await req.headers.authorization;
        if (auth) {
            const id = req.params.id;
            const token = await auth.split(" ")[1];
            const verified = jwt.verify(token, process.env.JWTKEY);

            if (verified && verified.isAdmin == true) {
                const data = await req.body;

                await Category.update({
                    name: data.name,
                },{
                    where: {
                        id: id
                    }
                });
                res.status(201).json({ message: "Category updated" });
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            res.status(401).json({ message: "Token required" });
        }
    },

    deleteCategoryById: async (req, res) => {
        const auth = await req.headers.authorization;
        if (auth) {
            const id = req.params.id;
            const token = await auth.split(" ")[1];
            const verified = jwt.verify(token, process.env.JWTKEY);

            if (verified && verified.isAdmin == true) {
                await Category.destroy({
                    where: {
                        id: id
                    }
                });
                res.status(201).json({message: "Category deleted"});
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } else {
            res.status(401).json({ message: "Token required" });
        }
    }
};
