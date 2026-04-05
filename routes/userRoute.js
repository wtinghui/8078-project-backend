const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const authenticateWithJWT = require('../middlewares/authenticateWithJWT')

router.post("/register", async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.status(200).json({
            "message": "New user created successfully"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            "error": e.message
        })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userDetails = await userService.loginUser(email, password)
        if (userDetails) {
            const token = jwt.sign({
                "userId": userDetails.user_id,
                "userRole": userDetails.user_type
            }, process.env.JWT_SECRET);
            res.status(200).json({
                "message": "Successful login",
                token
            })}
    } catch(e) {
        res.status(500).json({
            "error": e.message
        })
    }
})

router.get("/profile", authenticateWithJWT, async (req, res) => {
    try {
        console.log(req.userId);
        const userDetails  = await userService.getUserById(req.userId);
        console.log(userDetails);
        res.status(200).json({
            userDetails
        })
    } catch (e) {
        res.status(500).json({
            "error": e.message
        })
    }
})

router.put("/profile", authenticateWithJWT, async (req, res) => {
    try {
        await userService.updateUser(req.userId, req.body);
        res.status(200).json({
            "message": "Account details updated successfully"
        })
    } catch (e) {
        res.status(500).json({
            "error": e.message
        })
    }
});

router.delete("/profile", authenticateWithJWT, async (req, res) => {
    try {
        console.log(req.userId, req.body.password)
        await userService.deleteUser(req.userId, req.body.password);
        res.status(200).json({
            "message": "Account has been deleted"
        })
    } catch (e) {
        res.status(500).json({
            "error": e.message
        })
    }
});

router.get("/login", (req, res) => {
    res.json({
        "message": "You are viewing the login page"
    })
});

module.exports = router;