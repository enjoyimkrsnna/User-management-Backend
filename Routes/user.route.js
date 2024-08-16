    const express = require("express");
    const router = express.Router();
    
    const { getUsers, getSingleUser, updateUser,deleteUser } = require("../Controllers/user.controller.js");

    const authMiddleware = require("../Middleware/auth.middleware"); 

    router.get('/', authMiddleware, getUsers); 
    router.get("/:id", authMiddleware, getSingleUser);
    router.put("/:id", authMiddleware, updateUser); 
    router.delete("/:id", authMiddleware, deleteUser); 
    module.exports = router;