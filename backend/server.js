const express = require('express');
const mongoose = require('mongoose');
const userRrouter = require("./routes/userRoutes")
const app = express();
app.use(express.json());

app.use('/api' ,userRrouter)

mongoose.connect('mongodb://localhost:27017/posta', {
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));