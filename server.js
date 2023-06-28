const app = require('./app');
const express = require('express');
const databaseConnect = require('./config/database');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const port = process.env.PORT;

// database connect
databaseConnect();

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.static(path.join(__dirname + "./frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
})
app.listen(port, () => {
    console.log(`Server started at port:${port}`);
})