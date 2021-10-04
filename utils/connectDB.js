const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://manhcuong:manhcuong@cluster0.fbxn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => console.log("Mongodb conencted oke "))
  .catch((err) => console.log(err));
