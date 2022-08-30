const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
    console.log("error connecting to MongoDB:", error.message);
  });

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  media: [
    {
      id: Number,
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
