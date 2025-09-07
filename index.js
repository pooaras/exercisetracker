const express = require('express')
const app = express()
const cors = require('cors')
const api = require('./routes/api')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
app.use(express.json()); // 🔥 This line is missing

app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.static('public'))
app.use('/api',api)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
// app.post('/api/users', (req, res) => {
//   const username = req.body.username;
//   console.log('post api',username);
  
// })





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
