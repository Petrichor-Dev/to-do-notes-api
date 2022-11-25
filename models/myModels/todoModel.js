require('dotenv').config();
const { user, kategori, todo } = require('../');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

//generate response function
function response(success, status_code, detail_message, data) {
    return {success, status_code, detail_message, data};
}

// ---------------------------------CREATE_CATEGORY---------------------------------- //
const createSome = async (res, data, path = null) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur input data'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){
      switch (path) {
        case 'category':
            delete data.token;
            await kategori.create(data);
            return res.status(200).json(response(true, 200, 'Add Category success'));
          break;
        case null:
          delete data.token;
          await todo.create(data);
          return res.status(200).json(response(true, 200, 'Add Todo success'));
          break;
        default:
          return res.status(404).json(response(false, 404, 'Resources not found'));
          break;
      }

    } else {
      const error = 'Ups, there is something wrong. Check again ur input data';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

// ---------------------------------GET_CATEGORY---------------------------------- //

const getSome = async (res, data, path = null) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur input data'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){
      switch (path) {

        //route untuk merequest data kategori
        case 'category':

          //cek apakah user merequest data by id. Jika iya..
          if(data.id){
            const userData = await kategori.findOne({where:{id:data.id, uid:data.uid}, attributes: ['id', 'uid', 'nama_kategori']});

            //cek apakah request data by id berhasil di dapatkan
            if(typeof userData === 'object' && userData !== null){
              return res.status(200).json(response(true, 200, 'Get Category By Id Success', userData));
            } else {
              const error = 'Ups, there is something wrong. Check again ur input data by id';
              throw error;
            }
          } else {
            //user merequest all data tanpa id
            const userData = await kategori.findAll({where:{uid:data.uid}, attributes: ['id', 'uid', 'nama_kategori']});

            //cek apakah request data berhasil di dapatkan
            if(typeof userData === 'object' && userData !== null){
              return res.status(200).json(response(true, 200, 'Get All Category Success', userData));
            }
          }

        break;

        //route untuk merequest data todo
        case null:
          const tesFunc = async (uid, id = null, id_level = null, id_kategori = null, isComplete = null) => {

            // const userData = await todo.findAll({
            //   where:{
            //     uid:uid,
            //     isDeleted: null,
            //     [Op.or]: {
            //       id:id,
            //       [Op.or]: {
            //
            //         id_level: id_level,
            //         id_kategori: id_kategori,
            //         isComplete: isComplete
            //       }
            //     }
            //   }});

            // const userData = await todo.findAll({where:{
            //   isDeleted: null,
            //   uid:uid, id: id,
            //   id_level: id_level,
            //   id_kategori: id_kategori,
            //   isComplete: isComplete
            // }})

              return res.send(userData);
          }

          tesFunc(data.uid, data.id, data.id_level, data.id_kategori, data.isComplete);
        break;

        //route untuk menghandle data yang tidak di sediakan
        default:
          return res.status(404).json(response(false, 404, 'Resources not found'));
        break;
      }

    } else {
      const error = 'Ups, there is something wrong. Check again ur input data';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

// ---------------------------------DELETE_CATEGORY---------------------------------- //

const deleteSome = async (res, data, path = null) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur input data'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){
      switch (path) {
        case 'category':
          const checkQueryCategory = await kategori.update({isDeleted:true}, {where:{id:data.id, uid:data.uid}});
          if(checkQueryCategory != 0){
            return res.status(200).json(response(true, 200, 'Delete Category success'));
          }
          const errorCategory = 'Authorization denied';
          throw errorCategory;
        break;

        case null:
          const checkQueryTodo = await todo.update({isDeleted:true}, {where:{id:data.id, uid:data.uid}});
          if(checkQueryTodo != 0){
            return res.status(200).json(response(true, 200, 'Delete Todo success'));
          }
          const errorTodo = 'Authorization denied';
          throw errorTodo;
        break;

        default:
          return res.status(404).json(response(false, 404, 'Resources not found'));
        break;
      }

    } else {
      const error = 'Ups, there is something wrong. Check again ur input data';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}

// ---------------------------------UPDATE_CATEGORY---------------------------------- //

const updateSome = async (res, data, path = null) => {
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups, there is something wrong. Check again ur input data'));

  try {
    const jwtVerify = jwt.verify(data.token, process.env.jwt_key);
    if(jwtVerify.email === auth.email){
      switch (path) {
        case 'category':
          delete data.token;
          const checkQueryCategory = await kategori.update({nama_kategori:data.nama_kategori}, {where:{id:data.id, uid:data.uid}});
          if(checkQueryCategory != 0){
            return res.status(200).json(response(true, 200, 'Update Category success'));
          }
          const errorCategory = 'Authorization denied';
          throw errorCategory;
        break;

        case null:
          delete data.token;
          const checkQueryTodo = await todo.update(data, {where:{id:data.id, uid:data.uid}});
          if(checkQueryTodo != 0){
            return res.status(200).json(response(true, 200, 'Update Todo success'));
          }
          const errorTodo = 'Authorization denied';
          throw errorTodo;
        break;

        default:
          return res.status(404).json(response(false, 404, 'Resources not found'));
        break;
      }

    } else {
      const error = 'Ups, there is something wrong. Check again ur input data';
      throw error;
    }
  } catch (e) {
    return res.status(400).json(response(false, 400, e));
  }
}


module.exports = { createSome, getSome, deleteSome, updateSome };
