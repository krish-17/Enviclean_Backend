/* Dhrumil Amish Shah */
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: "envicleanassets",
    api_key: "248684754432536",
    api_secret: "wEFyKcPi6_fc1BhzUe1zaGH-QYg",
});

module.exports = cloudinary;