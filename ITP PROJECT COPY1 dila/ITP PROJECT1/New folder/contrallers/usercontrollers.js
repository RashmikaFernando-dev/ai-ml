const User = require("../model/UserModel");

const getAllUsers = async(req, res, next)=> {

    let Users;

    try{
        Users = await User.find();
    }catch(err){
        console.log(err)
    }
    //not found
    if(!Users){
        return res.status(404).json({message: "User not Found"});
    }

   //Displya all users
  return res.status(200).json({ users: Users });
};

//data insert
const addUsers = async (req,res,next) => {

    const {name,gmail,age,address} =req.body;

    let users;

    try{
        users = new User({name,gmail,age,address});
        await users.save();
    }catch(err){    
    }
//not insert users
if(!users){
    return res.status(404).send({message:"unable to add users"});
}

    return res.status(200).json({users});


}
//get by Id
const getById = async (req,res,next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    }catch(err){
        console.log(err);
    }

 //not available users 
    if(!user){
        return res.status(404).send({message:"User not Found"});
    }
    return res.status(200).json({user});
}

//update User detalis

const updateUser = async (req, res, next) => {

    const id = req.params.id;
    const {name,gmail,age,address} =req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate(id,
            {name: name, gmail: gmail, age: age, address: address});
            users = await users.save();
    }catch(err){
        console.log(err);
    }

    //not available users 
    if(!users){
        return res.status(404).send({message:"Unable to Update User details"});
    }
    return res.status(200).json({users});


};

//delete user
const deleteUser = async (req,res,next) => {
    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id)

    }catch(err){
        console.log(err);
    }

//not available users 
    if(!user){
        return res.status(404).send({message:"Unable to Delete User details"});
    }
   return res.status(200).json({ users: user });

};


exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;