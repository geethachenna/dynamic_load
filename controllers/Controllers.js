require('../models/database');
const animals = require('../models/animals');
const birds = require('../models/birds');
const plants = require('../models/plants');
const nature = require('../models/nature');


// APPS
exports.animals = async (req, res) => {
    try {
        const limitNumber = 20;
        const animals = await animals.find({}).limit(limitNumber);
        res.render('index', { title: "Ad Load", animals });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}


exports.plants = async (req, res) => {
    try {
        const limitNumber = 10;
        const plants = await plants.find({}).limit(limitNumber);
        res.render('plants', { title: "Ad Load", plants });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}


exports.birds = async (req, res) => {
    try {
        const limitNumber = 10;
        const birds = await birds.find({}).limit(limitNumber);
        res.render('birds', { title: "Ad Load", birds });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}


exports.nature = async (req, res) => {
    try {
        const limitNumber = 10;
        const nature = await nature.find({}).limit(limitNumber);
        res.render('nature', { title: "Ad Load", nature });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}

// async function insertDymmyplantsData(){
//   try {
//     await plants.insertMany([
//       {
//         "name": "p1",
//         "image": "p1.jpg"
//       },
//       {
//         "name": "p2",
//         "image": "p2.jpg"
//       },
//       {
//         "name": "p3",
//         "image": "p3.jpg"
//       },
//       {
//         "name": "p4",
//         "image": "p4.jpg"
//       },
//       {
//         "name": "p5",
//         "image": "p5.jpg"
//       },
//       {
//         "name": "p6",
//         "image": "p6.jpg"
//       },
//       {
//         "name": "p7",
//         "image": "p7.jpg"
//       },
//       {
//         "name": "p8",
//         "image": "p8.jpg"
//       },
//       {
//         "name": "p9",
//         "image": "p9.jpg"
//       },
//       {
//         "name": "p10",
//         "image": "p10.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyplantsData();