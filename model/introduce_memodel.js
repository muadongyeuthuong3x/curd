const { Schema, model } = require("mongoose");

const introduce = new Schema(
  {
    name:String,
    picture:String,
    age:Number,
    class:String
    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("introduce", introduce);
