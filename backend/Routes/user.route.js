const express = require('express')

const UserModel = require('../Model/user.model')

const userrouter = express.Router()
const bcrypt = require('bcrypt')
const app = express()




const jwt = require('jsonwebtoken')
    

userrouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
      bcrypt.hash(password, 5, async (err, hash) => {
          if (err) {
              console.log(err);
              res.send({ "msg": "Something went wring", "error": err.message })

          } else {
              const user = new UserModel({ name, email, password: hash })
              await user.save();
              res.send({ "msg": " New User register" })

          }
          // Store hash in your password DB.
      });

  } catch (err) {
      res.send({ "msg": "Something went wring", "error": err.message })
      console.log(err)
  }
})

userrouter.get("/data", async (req, res) => {
  try {
      const users = await UserModel.find()
      res.send("all the users data will be send")
      console.log(users)
  } catch (err) {
      res.send({ "msg": "cannot register", "err": err.message })
  }
  });
  


  userrouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const isUserPresent = await UserModel.findOne({ email });
      if (!isUserPresent) {
        return res.status(401).send("user not found");
      }
      const isPass = await bcrypt.compare(password, isUserPresent.password);
      if (!isPass) {
        return res.status(401).send({ msg: "invalid credential" });
      }
      const token = await jwt.sign(
        {
          userId: isUserPresent._id,
        },
        process.env.SECRET,
        { expiresIn: "1hr" }
      );
      res.send({
        msg: "login success",
        token,
        username: isUserPresent.name,
        userId: isUserPresent._id,
        
      });
    } catch (error) {
      res.status(401).send(error.message);
    }
  });

  // 
  const updatePassword = async (password) => {
    try {
      const hasPass = await bcrypt.hash(password, 8);
      return hasPass;
    } catch (error) {
      throw new Error("Failed to hash password");
    }
  };
  
  
  
  
  
  
  
  

  
  userrouter.get("/logout", async (req, res) => {
    try {
      const token = req.headers?.authorization;
      if (!token) return res.status(403);
      let blackListedToken = new BlackListModel({ token });
      await blackListedToken.save();
      res.send({ msg: "logout succesfull" });
    } catch (error) {
      res.send(error.message);
    }
  });



userrouter.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    const deleteUsers=await UserModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"User Deleted"})
})





module.exports=userrouter