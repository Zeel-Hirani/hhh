const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {createResturantController,getAllResturantController,getResturantByIdController,deleteResturantController }= require("../controllers/resturantControllers")
const router = express.Router();


router.post('/create', authMiddleware, createResturantController);

router.get('/getall',getAllResturantController)

router.get('/get/:id',getResturantByIdController);

router.delete('/delete/:id',authMiddleware,deleteResturantController)
module.exports = router;