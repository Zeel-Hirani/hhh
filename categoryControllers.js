const categoryModel = require("../models/categoryModel");

const createCatController = async (req, res) => {
    try {
      const { title, imageUrl } = req.body;
      //valdn

      if (!title) {
        return res.status(500).send({
          success: false,
          message: "please provide category title or image",
        });
      }
      await categoryModel.create(req.body)
      return res.status(200).send({message:"category created"})

    }catch(error){
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error In Create Cat API",
        error,
    });
  }
}

const getAllCatController = async (req,res)=>{
      try{
        const category = await categoryModel.find({});
        if(!category){
          return res.status(500).send({
            success: false,
            message: "No category found",
          });
        }
        res.status(200).send({
          success:true,
          totalcategory:category.length,
          category
        });
      }catch(error){
        console.log(error);
        res.status(500).send({
        success: false,
        message: "Error In get all Category API",
        error,
      })
}
}

const updateCatController = async(req,res)=>{
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update cat api",
      error,
    });
  }
}

const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No Category Found With this id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted succssfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Dlete Cat APi",
      error,
    });
  }
};

module.exports = {createCatController,getAllCatController,updateCatController,deleteCatController}    