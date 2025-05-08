const router = require('express').Router(); 
const User = require('../Models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('../routes/userAuth.js');



//// Sign up

router.post("/sign-up",async(req,res)=>{
    try{
    const {username,email,password,address} = req.body;
    // check username length more than 4 
    if(username.length <4){
        return res.status(400).json({message:"Username should be more than 3 characters"});
    }
    // check username already exists
    const foundUser = await User.findOne({username});
    if(foundUser){
        return res.status(400).json({message:"Username already exists"});
    }
  // check email already exists
  const foundEmail = await User.findOne({email});
  if(foundEmail){
      return res.status(400).json({message:"email already exists"});
  }

    // check password length more than 6
if(password.length < 6){
    return res.status(400).json({message:"Password should be more than 6 characters"}); 
}
const hashedPassword = await bcrypt.hash(password, 10);
req.body.password = hashedPassword;
const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({message:"User created successfully"});
    res.send(newUser);

    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }
});


//// Login
router.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body;
        const foundUser=await User.findOne({username});
        if(!foundUser){
            return res.status(400).json({message:"Invalid username or password"});
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid username or password"});
        }
        const authClaims=[
            {
                name:foundUser.username,
                role:foundUser.role,
            }
        ]
        const token = jwt.sign({authClaims},"bookStore123",{expiresIn:"30d"})// secret key
      
        res.status(200).json({message:"Login successful",user:{
            id:foundUser._id,
            role:foundUser.role,
            token:token,
        }});
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }
});

/// get user information 

router.get("/get-user",authenticateToken,async(req,res)=>{
   try{
    const {id} = req.headers;
    const data = await User.findById(id).select("-password -__v -createdAt -updatedAt"); // - means exclude this field
    if(!data){
        return res.status(400).json({message:"User not found"});
    }   
    return res.status(200).json({message:"User found",data});
   }catch(err){
    res.status(500).json({message:"Internal server error"});    
   }
});

/// update user information
router.put("/update-addr",authenticateToken,async(req,res)=>{       
try{
    const {id} = req.headers;
    const {address} = req.body;
    await User.findByIdAndUpdate(id,{address});
    return res.status(200).json({message:"User Updated",address});

}catch(err){
    console.log("error in the server "+ err)
    res.status(500).json({message:"Internal server error"});            

}
});
module.exports = router;
