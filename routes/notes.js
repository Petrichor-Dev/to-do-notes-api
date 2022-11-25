const express = require('express');
const router = express.Router();
const { getNote, createNote, updateNote, deleteNote } = require('../models/myModels/noteModel');

/* GET home page. */
router.post('/', (req, res) => {
  const data = {
    header: req.body.header,
    value: req.body.value,
    uid: req.body.uid,
    isDeleted: false,
    token: req.body.token
  }

  createNote(res, data);
});

router.get('/', (req, res, next) => {
  const data = {
    id: req.body.id,
    uid: req.body.uid,
    token: req.body.token,
    key: req.body.key
  }

  getNote(res, data, next);
});

router.delete('/', (req, res) => {
  const data = {
    id: req.body.note_id,
    uid: req.body.uid,
    token: req.body.token
  }
  deleteNote(res, data);
});

router.patch('/', (req, res) => {
  const data = {
    id: req.body.note_id,
    uid: req.body.uid,
    token: req.body.token,
    header: req.body.header,
    value: req.body.value
  }
  updateNote(res, data);
});


module.exports = router;
