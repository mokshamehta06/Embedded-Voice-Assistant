const app = require('./app.js');
const connectDb = require('./Config/connectDb.js');
const PORT = process.env.PORT || 5000;

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});