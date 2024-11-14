"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth"); // Import your middleware
const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    try {
        const { username, password } = req.body;
        // Find the user in the database
        const user = await user_js_1.User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        // Compare the password with bcrypt
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const router = (0, express_1.Router)();
// POST /login - Login a user
router.post('/login', exports.login);
// Example of a protected route
router.get('/protected', auth_1.authenticateToken, (req, res) => {
    res.json({ message: 'You have access to this protected route!' });
});
exports.default = router;
