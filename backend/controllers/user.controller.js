const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    throw new Error("All are required fields");
  }
  //checking if already exists
  const ifUserExists = await User.findOne({ email });
  //   console.log(ifUserExists);
  if (ifUserExists) {
    return res.status(401).json({
      success: false,
      message: "User Already Exists",
      ifUserExists,
    });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
  console.log(token);
  user.password = undefined;
  
  // res.setHeader('Set-Cookie', `authtoken=${token}; HttpOnly; SameSite=Strict;`);
  res   
    .cookie("authToken", token, {
      secure: true,
      expires: new Date(Date.now()+12*60*60*1000),
      httpOnly: true
    })
    .status(200)
    .json({
      success: true,
      message: "user signed in successfully",
      user,
      token,
    });

};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(402).json({
      success: false,
      message: "Email and Password are required fields",
    });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "user does not exist in the database",
      user,
    });
  }

  if (email && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

  

    user.password = undefined;
    // res.cookie('authToken', token,{
    //   expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // })
    // // res.setHeader()
    // // res.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict;`);
    // // console.log(res);
    // res.status(200).json({
    //   success: true,
    //   message: "Login successful",
    //   user,
    //   token
    // });
    res
    .cookie("authToken", token, {secure: true, httpOnly: true})
    .status(200)
    .json({
      success: true,
      message: "user signed in successfully",
      user,
      token,
    });
  }
};

exports.getUsers = async (req, res)=>{
  const users = await User.find();
  res.status(201).json({
    success: true,
    message: 'all users retrieved successfully',
    users,    
  })
}
// exports.testing = (_req, res)=>{
//   res.cookie('checkingToken', 'tokeniscoming')
//   res.send('testing the cookie')
// }
exports.logout = (req, res)=>{
  res.clearCookie('authToken')
  res.status(201).json({
    success: true, 
    message: 'user logged out successfully'
  })
}