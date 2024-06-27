const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {createCatController ,getAllCatController,updateCatController, deleteCatController}= require("../controllers/categoryControllers")

const router = express.Router();

router.post('/create',authMiddleware,createCatController)

router.get('/getAll',authMiddleware,getAllCatController)

router.put('/update/:id',authMiddleware,updateCatController)

router.delete('/delete/:id',authMiddleware,deleteCatController)
module.exports = router