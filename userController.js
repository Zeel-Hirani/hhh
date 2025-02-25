const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')

const getUserController = async (req,res)=>{
    // res.status(200).send("user data");
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id });
        //validation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User Not Found",
          });
        }
        //hinde password
        user.password = undefined;
        //resp
        res.status(200).send({
          success: true,
          message: "User get Successfully",
          user,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Eror in Get User API",
          error,
        });
      }
    };


    const updateUserController = async (req, res) => {
        try {
          // find user
          const user = await userModel.findById({ _id: req.body.id });
          //validation
          if (!user) {
            return res.status(404).send({
              success: false,
              message: "user not found",
            });
          }
          //update
          const { userName, address, phone } = req.body;
          if (userName) user.userName = userName;
          if (address) user.address = address;
          if (phone) user.phone = phone;
          //save user
          await user.save();
          res.status(200).send({
            success: true,
            message: "USer Updated SUccessfully",
          });
        } catch (error) {
        //   console.log(erorr);
          res.status(500).send({
            success: false,
            message: "Error In Udpate Userr API",
            error,
          });
        }
      };
      
    const resetPasswordController =async(req,res)=>{
         try{
          const {email,newPassword,answer}= req.body
          if(!email || !newPassword || !answer){
              return res.status(500).send({message:'please provide all field'})
          }
          const user = await userModel.findOne({email,answer});
          if(!user){
            return res.status(500).send({message:'User Not found or invalid answer'})
          }

          var salt = bcrypt.genSaltSync(10);
          const hashedPassword = await bcrypt.hash(newPassword,salt);
          user.password = hashedPassword
          await user.save()
          res.status(200).send('password reset successfully')
         }catch(erorr){
              console.log(erorr);
          res.status(500).send({
            success: false,
            message: "Error In reset password user API",
            error,
          });
         }
    }

    const updatePasswordController = async (req, res) => {
      try {
        //find user
        const user = await userModel.findById({ _id: req.body.id });
        //valdiation
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "Usre Not Found",
          });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
          return res.status(500).send({
            success: false,
            message: "Please Provide Old or New PasswOrd",
          });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(500).send({
            success: false,
            message: "Invalid old password",
          });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
          success: true,
          message: "Password Updated!",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In Password Update API",
          error,
        });
      }
    };

    const deleteProfileController = async(req,res)=>{
      try{
          // const id1= req.params.id;
          const delete1 = await userModel.findByIdAndDelete(req.params.id);
         return res.status(200).send({
            success: true,
            message: " your accout has been deleted",
          });
      }catch(erorr){
        console.log(erorr);
        res.status(500).send({message:'error in delete profile api'})
      }
    //   try {
    //     await userModel.findByIdAndDelete(req.params.id);
    //     return res.status(200).send({
    //       success: true,
    //       message: "Your account has been deleted",
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).send({
    //       success: false,
    //       message: "Erorr In Delete Profile API",
    //       error,
    //     });
    //   }
    }
module.exports = {getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController}