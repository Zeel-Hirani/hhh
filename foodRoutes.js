const express = require("express");
const { createFoodController,getAllFoodsController, getSingleFoodController, getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController} = require('../controllers/foodControllers')
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");


 
// const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//routes
//CREATE FOOD
router.post("/create", authMiddleware, createFoodController);


router.get('/getAll',getAllFoodsController)

router.get('/:id',getSingleFoodController)

router.get('/getByResturant/:id',getFoodByResturantController)

router.put("/update/:id", authMiddleware, updateFoodController);


router.delete("/delete/:id", authMiddleware, deleteFoodController);


router.post("/placeorder", authMiddleware, placeOrderController);

router.post("/orderstatus/:id",authMiddleware,adminMiddleware,orderStatusController)
module.exports = router;