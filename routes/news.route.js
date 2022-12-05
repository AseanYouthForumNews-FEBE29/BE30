const express = require('express')
const { check, validationResult } = require('express-validator')
const multer = require('multer')

const newsRouter = express.Router()

const { getAllNewsByUser, createNewsByUser, updateNewsByIdUser, deleteNewsByIdUser, getNeedProceedNews, putNeedProceedNews, getProceededNews, putProceededNews, getAllNews, getAllNewsByCountry, getAllNewsByCategory, getAllNewsByTrend, addLikeToNews, searchNewsByTitle, getNewsById } = require('../controllers/news.controller')

// Creator Only
newsRouter.get('/', getAllNewsByUser)
newsRouter.post('/', multer().single("image"), [
    check("title")
        .isLength({ min: 1 })
        .withMessage("Title Must Not Empty"),
    check("content")
        .isLength({ min: 1 })
        .withMessage("Content Must Not Empty"),
    check("summary")
        .isLength({ min: 1 })
        .withMessage("Summary Must Not Empty"),
], (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    const hasError = !error.isEmpty()

    if(hasError){
        res.status(422).json({error: error.array()})
    } else {
        next()
    }
}, createNewsByUser)

// Admin Only
newsRouter.get('/needProceed', getNeedProceedNews)
newsRouter.get('/proceeded', getProceededNews)
newsRouter.put('/proceed/:id', putNeedProceedNews)
newsRouter.put('/unproceed/:id', putProceededNews)

// Public
newsRouter.get('/all', getAllNews)
newsRouter.get('/detail/:id', getNewsById)
newsRouter.get('/all/trend', getAllNewsByTrend)
newsRouter.get('/all/country/:id', getAllNewsByCountry)
newsRouter.get('/all/category/:id', getAllNewsByCategory)
newsRouter.get('/like/:id', addLikeToNews)
newsRouter.get('/search', searchNewsByTitle)

// Admin and Creator Only
newsRouter.put('/:id', multer().single("image"), [
    check("title")
        .isLength({ min: 1 })
        .withMessage("Title Must Not Empty"),
    check("content")
        .isLength({ min: 1 })
        .withMessage("Content Must Not Empty"),
    check("summary")
        .isLength({ min: 1 })
        .withMessage("Summary Must Not Empty"),
], (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg)

    const hasError = !error.isEmpty()

    if(hasError){
        res.status(422).json({error: error.array()})
    } else {
        next()
    }
}, updateNewsByIdUser)
newsRouter.delete('/:id', deleteNewsByIdUser)

module.exports = newsRouter