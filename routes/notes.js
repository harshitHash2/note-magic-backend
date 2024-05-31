const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// const User = require('../models/User')
const Notes = require('../models/Notes');
// var bcrypt = require('bcryptjs');
var fetchuser = require('../middleware/fetchuser');

//Route 1 -> Fetching All Notes of the authenticated user
router.get('/fetchallnotes', fetchuser, async (req,res) => {
    try{
        const userid= req.user.id;
        const notes = await Notes.find({user: userid});
        res.json(notes);

    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })

  // Route 2 -> Add a new Note Endpoint
  router.post('/newnote', fetchuser, [
    body('title').isLength({ min : 3}),
    body('description').isLength({ min : 5})
  ], async (req,res) => {

    // Validating the user input 
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors: 'Validation Failed'});
    }
    const {title, description, tag} = req.body;
    try{
        const note = new Notes({title, description, tag, user: req.user.id});
        const savedNote= await note.save();
        res.json(savedNote);

    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })

  // Route 3 -> Update a note
  router.put('/note/:id', fetchuser, async (req,res) => {

    const {title, description, tag} = req.body;
    const newNote= {};
    if(title) {newNote.title= title};
    if(description) {newNote.description= description};
    if(tag) {newNote.tag= tag};

    const note = await Notes.findById(req.params.id);
    // console.log(note._id.toString());
    if(!note) {
        return res.status(404).send('Not found');
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).send('Not Allowed');
    }

    const note1= await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note1});
  })

  // Route 4 -> Deleteing a note
  router.delete('/deletenote/:id', fetchuser, async (req,res) => {

    const {title, description, tag} = req.body;
    
    const note = await Notes.findById(req.params.id);
    if(!note) {
        return res.status(404).send('Not found');
    
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).send('Not Allowed');
    }

    const note1= await Notes.findByIdAndDelete(req.params.id);
    res.json({'success': 'Note has been deleted'});
  })
module.exports= router;