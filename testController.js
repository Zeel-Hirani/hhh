const testUserController = (req,res)=>{
try{
 res.status(200).send('test user data')
}catch(error){
console.log("error In test api",error);
}
}

module.exports = {testUserController}