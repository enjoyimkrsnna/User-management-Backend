    const express = require("express");
    const router = express.Router();
    const { getUsers, getSingleUser,createUser, updateUser,deleteUser } = require("../Controllers/user.controller.js");

    router.get('/', getUsers);
    router.get("/:id",getSingleUser);
    router.post('/',createUser);
    router.put("/:id",updateUser);
    router.delete("/:id",deleteUser)

    module.exports = router;