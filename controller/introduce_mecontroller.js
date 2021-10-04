const boom = require("boom");

const Introduces = require("../model/introduce_memodel");

const getintroduces = async (req, reply) => {
  try {
   
    const introduce = await Introduces.find();
    reply.code(200).send(introduce);
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

const saveintroduce = async (req, reply) => {
  try {
    const introduce = new Introduces(req.body);

    await introduce.save();

    reply.code(201).send(introduce);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const updateintroduce = async (req, reply) => {
  try {
    const introduce = await Introduces.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    reply.code(200).send(introduce);
  } catch (err) {
    throw boom.boomify(err);
  }
};

const deleteintroduce = async (req, reply) => {
  try {
    await Introduces.findByIdAndDelete(req.params.id);

    reply.code(204).send();
  } catch (err) {
    throw boom.boomify(err);
  }
};



module.exports = {
  getintroduces,
  getintroduce,
  saveintroduce,
  updateintroduce,
  deleteintroduce,

};
