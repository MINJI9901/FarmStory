const mongoose = require('mongoose');
// import mongoose from 'mongoose';
const Farm = require('../models/farm');
const dotenv = require('dotenv');
dotenv.config()
// import { createApi } from 'unsplash-js';

const cities = require('./cities');
// const seedHelpers = require('./seedHelpers');
const { descriptors, places } = require('./seedHelpers');
// const { param } = require('../../YelpCamp_CODE/routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/FarmStory');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error!'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// const img_url = fetch(`https://api.unsplash.com/photos/random?collections=483251&client_id=Lmkw_sExjK3St5OAHeV7wm9YfiVtknrW7lrtXil9_f4`)
//     .then(res => res.json())
//     .then(data => {
//         return data.urls.regular
//     })
//     .catch(err => console.log(err))

// const fetchImage = async () => {
//     try {
//         const res = await fetch('https://api.unsplash.com/photos/random?collections=483251&client_id=rw9CM9XZzB7vWlSKj__3cCedV-mdYw0nyH45kefiWuU');
//         const data = await res.json();
//         return data.urls.thumb;
//     } catch (err) {
//         console.error(err);
//         return 'https://images.unsplash.com/photo-1724378950128-105ece9be45c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
//     }
// };

// const serverApi = createApi({
//     accessKey: process.env.UNSPLASH_ACCESS_KEY
// })

// const seedDB = async () => {
//     await Farm.deleteMany({});
//     for (let i = 0; i < 30; i++) {
//         // const random1000 = Math.floor(Math.random() * 1000);
//         // const randLocation = cities[random1000]
//         // const img_url = await fetchImage();
        
//         const farm =  new Farm({
//             title: `${sample(descriptors)} ${sample(places)}`,
//             // image type is String, it should be the return value of 'fetch' upthere
//             image: 'https://langplaas.co.za/wp-content/uploads/2019/12/Wortels-1.jpg',
//             location: `${sample(cities).city}, ${sample(cities).state}`
//         });
//         await farm.save();
//     }
// }

// const seedDB = async () => {
//     for (let farm of await Farm.find({})) {
//         // console.log(farm.title, farm.location);
//         await Farm.findOneAndUpdate({title: farm.title, location: farm.location}, {
//             description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         })
//     }
// }

const seedDB = async () => {
    for (let farm of await Farm.find({})) {
        // console.log(farm.title, farm.location);
        await Farm.findOneAndUpdate({location: farm.location}, {name: `${sample(descriptors)} ${sample(places)}`})
    }
}

seedDB().then(() => {   
    mongoose.connection.close();
})