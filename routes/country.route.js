const express = require("express");
const countryRouter = express.Router();

const {
    getAllCountry,
    getCountryById,
    addCountry,
    updateCountryById,
    deleteCountryById,
} = require("../controllers/country.controller");

countryRouter.get("/", getAllCountry);
countryRouter.post("/", addCountry);
countryRouter.get("/:id", getCountryById);
countryRouter.put("/:id", updateCountryById);
countryRouter.delete("/:id", deleteCountryById);

module.exports = countryRouter;
