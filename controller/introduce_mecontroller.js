const boom = require("boom");
const fs = require('fs')
const Introduces = require("../model/introduce_memodel");
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "oke-nhe",
    api_key: "781621456395586",
    api_secret:"u_-ABpw2MqcAoDywCw9s6XpKkxw"
})
const saveintroduce = async (req, reply) => {

   const data =   await  uploadToCloudinary(req.file.path)
   const picture =data.url

   if(req.body.name.length<5)
   return reply.status(400).send({msg:"Ten cua ban phai lon hon 5 ki tu"})
   if(req.body.age<18 || req.body.age>25 )
   return reply.status(400).send({msg:"tuoi cua ban phai lon hon 18 va nhon hon 25"})
  
   if(req.body.class != 'A' || req.body.class != 'B' || req.body.class != 'C' ){
   }else{
    return reply.status(400).send({msg:"Ban khong the fech data cua select html"})
   }
   try {
     const introduce = new Introduces({
      name:req.body.name,
      picture: picture,
      age:req.body.age,
      class:req.body.class
     });
     await introduce.save();
     fs.unlinkSync(`${req.file.path}`, err => {
      if (err) throw err;
     
  });
     reply.code(201).send({
       msg:"tao thành công",
       introduce
     });
   } catch (err) {
     throw boom.boomify(err);
   }
 };



const getintroduces = async (req, reply) => {
  try {
   
    const introduces = await Introduces.find();
    reply.code(200).send(introduces);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const getintroduce = async (req, reply) => {
  try {
    const introduce = await Introduces.findById(req.params.id);

    reply.code(200).send(introduce);
  } catch (err) {
    throw boom.boomify(err);
  }
};



const updateintroduce = async (req, reply) => {
 

  if(req.body.nameme.length<5)
  return reply.status(400).send({msg:"Ten cua ban phai lon hon 5 ki tu"})

  if(req.body.age<18 || req.body.age>25 )
  return reply.status(400).send({msg:"tuoi cua ban phai lon hon 18 va nhon hon 25"})

  if(req.body.class != 'A' || req.body.class != 'B' || req.body.class != 'C' ){
  }else{
   return reply.status(400).send({msg:"Ban khong the fech data cua select html"})
  }

  


  try {
    const idd  =  req.params.id
    
    if(req.file.path === undefined){ 
     await Introduces.findByIdAndUpdate({ _id : idd},{
      name:req.body.nameme,
      picture: req.body.picture,
      age:req.body.age,
      class:req.body.class
     })
 
    }

     else  {
      const dl = await Introduces.findById(idd)
      const dlimg = dl.picture.slice(60 , dl.picture.length-4 )
      await  DeleteToCloudinary(dlimg);
      const data =   await  uploadToCloudinary(req.file.path)
      const picture =data.url
      console.log("aa")
      await Introduces.findByIdAndUpdate({ _id : idd},{
        name:req.body.nameme,
        picture:  picture,
        age:req.body.age,
        class:req.body.class
       })
      fs.unlinkSync(`${req.file.path}`, err => {
        if (err) throw err;
        });
     }

     reply.status(200).send({msg:"Sua oke"});
  
  }catch (err) {
    throw boom.boomify(err);
  }
};

const deleteintroduce = async (req, reply) => {
 
  try {
    const id = req.params.id
    const data = await Introduces.findById(id)
    const dlimg = data.picture.slice(60  ,   data.picture.length-4 )
    await Introduces.findByIdAndDelete(id)

    await  DeleteToCloudinary(dlimg);

    reply.code(200).send({
      msg:"Xoa oke"
      ,id
    });

  } catch (err) {
    throw boom.boomify(err);
  }
};



function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, {folder: "test"}, (err, req) => {
      if (err) return reject(err);
      return resolve({public_id: req.public_id, url: req.secure_url});
    })
  });
}

function DeleteToCloudinary(image) {

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(image,  (err, url) => {
      console.log(url)
      if (err) return reject(err);
      return resolve()
    })
  });
}

module.exports = {
  getintroduces,
  getintroduce,
  saveintroduce,
  updateintroduce,
  deleteintroduce,
};
