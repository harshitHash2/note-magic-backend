const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
var bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');


// JWT Tokenizer
var jwt = require('jsonwebtoken');
const JWT_TKN = 'HashOPBolte';


//ROUTE 1 -> Signup for the new user ENDPOINT
router.post('/', [
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
], async (req, res) => {

    // Validation for the input Fields
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
try {
    // Adding Salt & Hash function to password and Createing entry in DB
    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);
    const user = await  User.create({
        username: req.body.name,
        password: secpass,
        email: req.body.email
    });
    // fetching id of the created user for token generation
    const data={
        user: {
            id: user.id
        }
    }

    // Creating Token for authentication of the user
    const authtoken = jwt.sign(data, JWT_TKN);
    console.log(authtoken);
    res.json({authtoken});

}catch (e) {
    //Typererror
    res.status(500).send('SOme error Occured');
}

  })


  //Route 2 -> Authenticating the user LOGIN ENDPOINT
  router.post('/auth', [
    body('email').isEmail(),
    body('password').exists()
  ], async (req,res) => {

    // Validating the user input 
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try{
        // Validating the credential if exist or not
        let user= User.findOne(email);
        if(!user){
            return res.status(400).json({errors: 'Enter correct Credentials'});
        }

        // If exists comparing with the hash of the by decrypting the existed hash function conversion
        const passwordComp= bcrypt.compare(password, user.password);
        if(!passwordComp){
            return res.status(400).json({errors: 'Enter correct Credentials'});
        }

        const data ={
            user: {
                id: user.id
            }
        }
        const authtoken= jwt.sign(data, JWT_TKN);
        res.json(authtoken);

    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }

    //Fetch USer Details 


  })


  // Route 3 -> Fetch User Details
  router.post('/getuser', fetchuser, async (req,res) => {

    
    try{
        const userid= req.user.id;
        const user = await User.findById(userid).select('-password');
        res.send(user);

    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })


module.exports= router;