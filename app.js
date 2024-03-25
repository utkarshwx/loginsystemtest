const dbConnect = require("./db/dbConnect.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const User = require("./db/userModel.js");

const auth = require("./auth.js")

app.use(express.json());
dbConnect();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Alllow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authoriztion"
    );
    res.setHeader(
        "Access-Control-Allow-Header",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.post("/register", (request, response) => {
    bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: request.body.email,
                password: hashedPassword,
            })
            user.save()
                .then((result) => {
                    response.status(201).send({
                        message: "user Created Successfully",
                        result,
                    });
                })
                .catch((error) => {
                    response.status(500).send({
                        message: "Error creating user",
                        error,
                    })
                })

        })
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            })
        })
})

app.post("/login", (request, response) => {
    User.findOne({ email: request.body.email })
        .then((user) => {
            bcrypt.compare(request.body.password, user.password)
            .then((passwordCheck) => {
                if(!passwordCheck) 
                    return response.status(400).send({
                        message: "Password Doesn't Match",
                        error,
                })
            
                const token = jwt.sign({
                    userId: user._id,
                    userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h"}
                );

                response.status(200).send({
                    message: "Login Successful",
                    email: user.email,
                    token,
                });
        })
            .catch((error) => {
                response.status(400).send({
                    message: "Passwords Does not match",
                    error,
                })
            })
        })
        .catch((e) => {
            response.status(404).send({
                message: "Email not found",
                e,
            })
        })
})


app.get("/free-endpoint", (request, response) => {

    response.json({message: "You are free to access anytime"});
});

app.get("/auth-endpoint", auth, (request, response) => {
    response.json({message: "You are authorized to access"})
})

module.exports = app;