//importing modules
const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");


// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
   
 try {
   const { userName, email, password } = req.body;
   const data = {
     userName,
     email,
     password: await bcrypt.hash(password, 10),
   };
   const users = await User.findOne({
    where: {
    email: email
  } 
    
  });
  
   //saving the user
   const user = await User.create(data);

   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   console.log(user, "this is backend")
   if (user) {
     let token = await jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};


//login authentication

const login = async (req, res) => {
 try {
const { email, password } = req.body;

   //find a user by their email
   const user = await User.findOne({
     where: {
     email: email
   } 
     
   });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });
       

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       //send user data
       return res.status(201).json({ user, token });
     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

const logout = (req, res) => {
  // Clear the JWT token by setting it to an empty string
  res.cookie("jwt", "", { maxAge: 0, httpOnly: true });

  // Send a response to indicate successful logout
  return res.status(200).send("Logout successful");
};



module.exports = {
 signup,
 login,
 logout,
};