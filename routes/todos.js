const express = require('express');
const router = express.Router();
const { createSome, getSome, deleteSome, updateSome } = require('../models/myModels/todoModel');

// ---------------------------------TODO---------------------------------- //
router.post('/', (req, res) => {
  const data = {
    value: req.body.value,
    id_kategori: req.body.id_kategori,
    id_level: req.body.id_level,
    tag: req.body.tag,
    deskripsi: req.body.deskripsi,
    uid: req.body.uid,
    isComplete: req.body.isComplete,
    isDeleted: false,
    token: req.body.token
  }

  createSome(res, data);
});

router.get('/', (req, res) => {
  const data = {
    id: req.body.id,
    uid: req.body.uid,
    id_level: req.body.id_level,
    id_kategori: req.body.id_kategori,
    isComplete: req.body.isComplete,
    token: req.body.token
  }

  getSome(res, data);
});

router.patch('/', (req, res) => {
  const data = {
    value: req.body.value,
    id_kategori: req.body.id_kategori,
    id_level: req.body.id_level,
    tag: req.body.tag,
    deskripsi: req.body.deskripsi,
    uid: req.body.uid,
    isComplete: req.body.isComplete,
    isDeleted: false,
    token: req.body.token
  }

  updateSome(res, data);
});

router.delete('/', (req, res) => {
  const data = {
    id: req.body.id,
    uid: req.body.uid,
    token: req.body.token
  }

  deleteSome(res, data);
});

// ---------------------------------TODO-CATEGORY---------------------------------- //

router.get('/:path', (req, res) => {
  const path = req.params.path;
  const data = {
    id: req.body.id,
    nama_kategori: req.body.nama_kategori,
    uid: req.body.uid,
    token: req.body.token
  }

  getSome(res, data, path)
});

router.post('/:path', (req, res) => {
  const path = req.params.path;

  const data = {
    nama_kategori: req.body.nama_kategori,
    uid: req.body.uid,
    isDeleted:false,
    token: req.body.token
  }

  createSome(res, data, path);
});

router.patch('/:path', (req, res) => {
  const path = req.params.path;

  const data = {
    id: req.body.id,
    nama_kategori: req.body.nama_kategori,
    uid: req.body.uid,
    token: req.body.token
  }

  updateSome(res, data, path)
});

router.delete('/:path', (req, res) => {
  const path = req.params.path;
  const data = {
    id: req.body.id,
    uid: req.body.uid,
    token: req.body.token
  }
  deleteSome(res, data, path);
});














module.exports = router;
