import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Invalid UserName and Password"
                })
            }
            bcrypt.compare(password, dbUser.password)
                .then(isCorrect => {
                    if (!isCorrect) {
                        return res.json({ message: "Incorrect UserName or Password" })
                    }
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                    }
                    const token = jwt.sign(
                        payload, 'secret', { expiresIn: 86400 }
                    );
                    console.log("Logged in ")
                    res.json({ message: "success" ,token: token , info:dbUser});
                })
                .catch();
        })
        .catch();
};


export const signup = async (req, res, next) => {
    const user = req.body;
    console.log(user);
    const takenUserName = await User.findOne({ userName: user.username });
    const takenEmail = await User.findOne({ email: user.email });

    if (takenEmail === true || takenUserName === true) {
        return res.json({ message: "UserName and email Address already taken" });
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);
        const dbUser = new User({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await dbUser.save();
        res.json({ message: "User Created Successfully" });
    }
};