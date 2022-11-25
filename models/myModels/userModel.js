require('dotenv').config();
const { user, kategori } = require('../');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//generate response function
function response(success, status_code, detail_message, data) {
    return {success, status_code, detail_message, data};
}

// ---------------------------------SIGNUP---------------------------------- //
async function signup(res, data) {
    const auth = await user.findOne({
        where:{email:data.email}
    });
    //cek apakah email sudah terdaftar
    if(auth) {
        return res.status(200).json(response(true, 400, 'Email anda sudah terdaftar. Silahkan melakukan signin'));
    }

    //encrypt password
    bcrypt.hash(data.password, 10, (err, hash) => {
      //ganti password yang di inputkan user dengan password yang sudah di hash
      const [newObj] = [data].map((d) => {
        d.password = hash;
        return d;
      });
      //insert ke db
      user.create(newObj).then(() => {
          return res.status(200).json(response(true, 200, 'Anda berhasil signup. Silahkan melakukan signin'));
      }).catch((err) => {
          return res.status(400).json(response(false, 400, err));
      });
    });
}

// ---------------------------------SIGNIN---------------------------------- //
async function signin(res, data){
    const auth = await user.findOne({where:{email:data.email}});
    if(!auth){
        return res.status(400).json(response(false, 400, 'Email anda belum terdaftar, silahkan melakukan signup'));
    }

    bcrypt.compare(data.password, auth.password, (err, result) => {
        if(result){
          //Generate jwt
          const jwtKey = process.env.jwt_key;
          const token = jwt.sign({email: auth.email}, jwtKey, {expiresIn:60*60});

          const userInformation = {
            uid: auth.id,
            name: auth.nama,
            username: auth.username,
            email: auth.email,
            token
          }
          return res.status(200).json(response(true, 200, 'Signin berhasil', userInformation));
        }
        return res.status(400).json(response(false, 400, 'Signin gagal. Silahkan periksa kembali data yang anda inputkan'));
    });
}

// ---------------------------------UPDATE---------------------------------- //
async function update(res, data){
  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups there is something wrong. Mohon periksa kembali data anda'));

  const jwtVerify = jwt.verify(data.token, process.env.jwt_key);

  if(jwtVerify.email === auth.email){
    try {
      await user.update(data, {where:{id:data.uid}});
      return res.status(200).json(response(true, 200, 'Update success'));
    } catch (e) {
      return res.status(400).json(response(true, 400, 'Ups..'));
    }
  }

  return res.status(400).json(response(false, 400, 'token not valid'));
}

// ---------------------------------REMOVE---------------------------------- //
async function remove(res, data){

  const auth = await user.findOne({where:{id:data.uid}});
  if(!auth) return res.status(400).json(response(false, 400, 'Ups there is something wrong. Mohon periksa kembali data anda'));

  const jwtVerify = jwt.verify(data.token, process.env.jwt_key);

  if(jwtVerify.email === auth.email){
    try {
      await user.update({isDeleted:data.isDeleted}, {where:{id:data.uid}});
      return res.status(200).json(response(true, 200, 'Delete success'));
    } catch (e) {
      return res.status(400).json(response(true, 400, 'Ups..'));
    }
  }

  return res.status(400).json(response(false, 400, 'token not valid'));
}

module.exports = { signup, signin, remove, update };
