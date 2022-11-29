const express = require("express");
const categoryRouter = express.Router();

const {
    getAllCategory,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
} = require("../controllers/category.controller");

categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", addCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updateCategoryById);
categoryRouter.delete("/:id", deleteCategoryById);

module.exports = categoryRouter;
