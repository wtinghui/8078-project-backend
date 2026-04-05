const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post("/register", async (req, res)=>{
    try{
        await userService.createUser(req.body);
        res.status(200).json({
            "message":"New user created successfully"
        })
    }catch(e){
        console.log(e)
        res.status(500).json({
            "error":e.message
        })
    }
});

router.post("/profile", async (req,res)=>{
    try{
        const userDetails = await userService.loginUser(req.body.email, req.body.password)
        res.status(200).json({
            "message": "Successful login",
            "details": userDetails
        })
    } catch(e){
        res.status(500).json({
            "error":e.message
        })
    }
})

router.put("/profile", async (req,res) =>{
    try{
        await userService.updateUser(req.body);
        res.status(200).json({
            "message":"Details updated successfully"
        })
    } catch(e){
        res.status(500).json({
            "error":e.message
        })
    }
});

router.delete("/profile", async (req, res)=>{
    try{
        await userService.deleteUser(req.body.userId, req.body.password);
        res.status(200).json({
            "message":"Account has been deleted"
        })
    } catch(e){
        res.status(500).json({
            "error":e.message
        })
    }
});

router.get("/login",(req,res)=>{
    res.json({
        "message":"You are viewing the login page"
    })
});

module.exports=router