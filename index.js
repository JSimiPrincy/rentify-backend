// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const propertyRoutes = require('./routes/properties');
const app = express();

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);



const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
