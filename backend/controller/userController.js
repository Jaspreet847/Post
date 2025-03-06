const bcrypt = require("bcrypt");
const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");


//signup
const signup = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10) // Corrected salt rounds
        .then((hashedPassword) => {
            return UserModel.create({ name, email, password: hashedPassword });
        })
        .then((user) => {
            res.status(201).json({ message: "User registered successfully!", user });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};


//login
const login = (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "No record found" });
            }

            return bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(400).json({ message: "Invalid email or password" });
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { id: user.id, email: user.email },
                        "This_is_my_secret_key",
                        { expiresIn: "24h" }
                    );

                    res.status(200).json({ message: "Login Successful", token });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

module.exports = { signup, login };
