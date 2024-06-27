const resturantModel = require('../models/resturantModel');


const createResturantController =async (req,res)=>{
  try{
    const {
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords,
      } = req.body;
      if (!title || !coords) {
        return res.status(500).send({
          
          message: "please provide title and address",
        });
      }
    const newRestaurant = await resturantModel.create(req.body);
    res.status(201).json(newRestaurant);
    // const newResturant = new resturantModel({
    //   title,
    //   imageUrl,
    //   foods,
    //   time,
    //   pickup,
    //   delivery,
    //   isOpen,
    //   logoUrl,
    //   rating,
    //   ratingCount,
    //   code,
    //   coords,
    // });

    // await newResturant.save();

    // res.status(201).send({
    //   success: true,
    //   message: "New Resturant Created successfully",
    // });

  }catch(erorr){
    console.log(error);
    res.status(500).send({

        message: "Error In Create Resturant api",
        error
    });
  }

}

const getAllResturantController = async (req,res)=>{
    try{
    const Resturant = await resturantModel.find({});
    if(!Resturant){
      res.status(400).send("no resturant found")
    }
    return res.status(200).send({totalResturant:Resturant.length,Resturant})
  }catch(erorr){
    console.log(erorr);
    res.status(500).send({

      message: "Error In Get all Resturant api",
      error
  });
  }
}

const getResturantByIdController = async(req,res)=>{
  try{
    const Resturant = await resturantModel.findById(req.params.id);
    if(!Resturant){
      res.status(404).send("no resturant found")
    }
    return res.status(200).send(Resturant)
  }catch(erorr){
    console.log(erorr);
    res.status(500).send({

      message: "Error In Get Resturant by id api",
      error
  });
  }
}

const deleteResturantController = async(req,res)=>{
  try{
    const Resturant = req.params.id;
    if(!Resturant){
      res.status(404).send({message:"no resturant found"})
    }
     await resturantModel.findByIdAndDelete(Resturant)
    return res.status(200).send({message:"resturant delete successfully"})
  }catch(erorr){
    console.log(erorr);
    res.status(500).send({
      success:false,
      message: "Error In delete  Resturant  api",
      error
  });
  }
  
}
module.exports = {createResturantController,getAllResturantController,getResturantByIdController,deleteResturantController};