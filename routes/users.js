const express = require('express');
const router = express.Router();
const { signup, signin, remove, update } = require('../models/myModels/userModel');

router.get('/signup', (req, res, next) => {
  const data = {
    nama: req.body.nama,
    password: req.body.password,
    username: req.body.username,
    email: req.body.email,
    isDeleted: false
  }
  signup(res, data);
});

router.get('/signin', (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  signin(res, data);
});

router.patch('/', (req, res, next) => {
  const data = {
    uid: req.body.uid,
    nama: req.body.nama,
    username: req.body.username,
    email: req.body.email,
    token: req.body.token
  }

  update(res, data);
});

router.delete('/', (req, res, next) => {
  const data = {
    isDeleted: true,
    uid: req.body.uid,
    token: req.body.token
  }

  remove(res, data);
});


router.patch('/change-password', (res, req, next) => {
  res.send('change password');
});
module.exports = router;
