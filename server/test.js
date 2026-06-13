require("dotenv").config();
const mongoose = require("mongoose");

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  family: 4
})
.then(() => {
  console.log("✅ MongoDB Connected");
  process.exit(0);
})
.catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
