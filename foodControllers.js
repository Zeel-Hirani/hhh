const foodModel = require('../models/foodModel');
const orderModel = require('../models/orderModel');
// const FoodModel = require('../models/foodModel')
const createFoodController = async (req, res) => {
  try{
    const {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      } = req.body;
  
      if (!title || !description || !price || !resturnat) {
        return res.status(500).send({
          success: false,
          message: "Please Provide all fields",
        });
      }
      const foodcreate = await foodModel.create(req.body);
      return res.status(200).json(foodcreate)
  }catch(erorr){
    console.log('===',error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }

}

const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find();
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro In Get ALL Foods API",
      error,
    });
  }
}

const getSingleFoodController = async(req,res)=>{
  const food = req.params.id;
  try{
  if(!food){
    return res.status(404).send({
      success: false,
      message: "please provide id",
    });
  }
  
  const singlefood = await foodModel.findById(food);
  res.status(200).send(singlefood);
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error In get SIngle Food API",
    error,
  });
}
};

const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "please provide id",
      });
    }
    console.log(resturantId);
    const food = await foodModel.find({resturantId: resturantId })
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with htis id",
      });
    }
    // res.status(200).send(food);
    res.status(200).send({
      success: true,
      message: "food base on restuatrn",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
}

const updateFoodController = async (req,res)=>{
  try{ 
  const foodId = req.params.id;
  if(!foodId){
    return res.status(404).send({
      success: false,
      message: "No Foodid Found with htis id",
    });
  }
  const food = await foodModel.findById(foodId)
  if(!food){
    return res.status(404).send({
      success: false,
      message: "No Food found",
      });
    }
  const{ 
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
  } = req.body

  const updatefood = await foodModel.findByIdAndUpdate(foodId,{ title,
    description,
    price,
    imageUrl,
    foodTags,
    catgeory,
    code,
    isAvailabe,
    resturnat,
    rating,},{new:true});
    res.status(200).send({
      success:true,
      message:"Food item was update"
    })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }
}

const deleteFoodController = async (req,res)=>{
  try{   
  const deletefood = req.params.id;
  
  await foodModel.findByIdAndDelete(deletefood)
  res.status(200).send({
    success:true,
    message:"Food item delete"
  })
  }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get SIngle Food API",
      error,
    });
  }

}


const placeOrderController = async (req,res)=>{
try{
  const {cart} = req.body;
  if(!cart){
    return res.status(500).send({
      success:false,
      message:"please food cart or payment method"
    })
  }
  let total = 0;
  cart.map((i)=>{
    total += i.price
  });

  const newOrder = new orderModel({
    foods: cart,
    payment:total,
    buyer: req.user,
  })
  // console.log("===>",newOrder);
  await newOrder.save()
  res.status(200).send({
    success: true,
    message:" Order Placed successfully",
    newOrder,
  })

}catch(error){
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error In get SIngle Food API",
    error,
  });
}
}

const orderStatusController = async(req,res)=>{
 try{
    const orderId = req.params.id
    const {status}= req.body
    const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
    res.status(200).send({success:true,
    message:"Order Status Updated"})
  }catch(error){
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error In order status API",
    error,
  });
}
}
module.exports = {createFoodController,getAllFoodsController,getSingleFoodController,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController};