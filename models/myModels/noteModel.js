require('dotenv').config();
const { user, note } = require('../');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

//generate response function
function response(success, status_code, detail_message, data) {
    return {success, status_code, detail_message, data};
}

// ---------------------------------CREATE_NOTE---------------------------------- //

const createNote = async (res, data) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur data input'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){
      delete data.token;
      await note.create(data);
      return res.status(200).json(response(true, 200, 'Add Note success'));
    } else {
      const error = 'Ups, there is something wrong. Check again ur data input';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

// ---------------------------------GET_NOTE---------------------------------- //

const getNote = async (res, data) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur data input'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){

      if(data.id || data.key){

        if(data.key){
          //----GET DATA BY KEY ----
          const result = await note.findAll({where:{
            uid:data.uid,
            isDeleted:false,
            [Op.or]: {
              [Op.or]: [
                {
                  header: {
                    [Op.substring]: data.key
                  }
                },
                {
                  value: {
                    [Op.substring]: data.key
                  }
                }
              ]
            }}});
          return (result == '' ?
            res.status(404).json(response(false, 404, 'Data with that key not found')) :
            res.status(200).json(response(true, 200, 'Success get data by key', result))
          );
        } else {
          //----GET DATA BY ID ----
          const result = await note.findOne({where:{
            id:data.id,
            uid:data.uid,
            isDeleted:false
          }});
          return (result == '' || result == null ?
            res.status(404).json(response(false, 404, 'Data with that id not found')) :
            res.status(200).json(response(true, 200, 'Success get data by id',result))
          );

        }

      } else {
        //----GET ALL DATA ----
        const result = await note.findAll({where:{uid:data.uid, isDeleted:false}});
        return (result == '' ?
          res.status(404).json(response(false, 404, 'This user has not create any notes')) :
          res.status(200).json(response(true, 200, 'Success get all data', result))
        );
      }

    } else {
      const error = 'Ups, there is something wrong. Check again ur data input';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

// ---------------------------------DELETE_NOTE---------------------------------- //

const deleteNote = async (res, data) => {
  const auth = await user.findOne({where:{id:data.uid}});
  //cek apakah uid valid
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur data input'));

  try {
    //cek apakah token valid
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    //cek apakah token benar milik si user
    if(jwtVerify.email === auth.email){
      const check = await note.update({isDeleted:true}, {where:{id:data.id, uid:data.uid}});
      //check apakah query berhasil or not
      if(check != 0){
        return res.status(200).json(response(true, 200, 'Delete Note success'));
      }
      const error = 'Authorization denied';
      throw error;

    } else {
      const error = 'Ups, there is something wrong. Check again ur data input';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

// ---------------------------------UPDATE_NOTE---------------------------------- //

const updateNote = async (res, data) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur data input'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){
      delete data.uid; delete data.token;
      await note.update(data, {where:{id:data.id}});
      return res.status(200).json(response(true, 200, 'Update Note success'));
    } else {
      const error = 'Ups, there is something wrong. Check again ur data input';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

module.exports = { getNote, createNote, deleteNote, updateNote };
