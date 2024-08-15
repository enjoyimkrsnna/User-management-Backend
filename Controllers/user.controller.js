const User = require("../Models/user.models");

const getUsers  = async (req,res)=>{

    try{
        const user =  await User.find({});
        res.status(200).json(user); 
    }catch(error)
    {
        res.status(500).json({message:error.message});
    }

}

const getSingleUser = async (req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        if(!user)
        {
                 return res.status(404).json({"message":"User not found"});
        }
        res.status(200).json(user);

    }catch(error)
    {
        res.status(500).json({message:error.message});
    }
}

const createUser = async(req,res)=>{
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
    
       }catch(error){
            res.status(500).json({message:error.message});
       }
}

const updateUser = async(req,res)=>{
    
    try{

        const user =  await User.findByIdAndUpdate(req.params.id,req.body);
        if(!user)
        {
             return res.status(404).json({"message":"User not found"});
        }
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json(updatedUser);
 
     }catch(error)
     {
         res.status(500).json({message:error.message});
     }
}


const deleteUser = async(req,res)=>{
    try{

        const user =  await User.findByIdAndDelete(req.params.id);
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json(`user deleted Successfully`)

    }catch(error)
    {
        res.status(500).json({messsage:error.message});
    }
}


module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}