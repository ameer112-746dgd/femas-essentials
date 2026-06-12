// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const Product = require('./models/Product');

// dotenv.config();
// connectDB();

// // NOTE: We assume all files are now named 1.jpg, 2.jpg... inside /products/
// const products = [
//   {
//     name: 'Glow Oil',
//     price: 12500,
//     category: 'Body Oil',
//     image: '/products/1.jpg', 
//     description: 'A luxurious body oil designed to lock in moisture.',
//     ingredients: 'Jojoba Oil, Vitamin E.',
//     usage: 'Apply to damp skin.'
//   },
//   {
//     name: 'Blazing Bliss',
//     price: 10500,
//     category: 'Luxury Butter',
//     image: '/products/2.jpg',
//     description: 'Ignite your skin radiance.',
//     ingredients: 'Chili Seed Oil.',
//     usage: 'Massage into skin.'
//   },
//   {
//     name: 'Citrus Ointment',
//     price: 15000,
//     category: 'Oil',
//     image: '/products/3.jpg',
//     description: 'Targeted treatment for hyperpigmentation.',
//     ingredients: 'Lemon Extract.',
//     usage: 'Dab on spots.'
//   },
//   {
//     name: 'Coco & Dreams',
//     price: 19500,
//     category: 'Body Butter',
//     image: '/products/4.jpg',
//     description: 'Whipped body butter.',
//     ingredients: 'Cocoa Butter.',
//     usage: 'Apply generously.'
//   },
//   {
//     name: 'Green Tea Cleanser',
//     price: 7000,
//     category: 'Cleanser',
//     image: '/products/5.jpg',
//     description: 'Gentle cleanser.',
//     ingredients: 'green tea extract, allantoin, aqua, glycerin, lactic acid, aloe barbadensis leaf juice, decylglucoside.',
//     usage: 'Wash face daily.'
//   },
//   {
//     name: 'Hair Growth Oil/ Scalp treatment',
//     price: 7000,
//     category: 'Hair Care',
//     image: '/products/6.jpg',
//     description: 'Stimulate growth.',
//     ingredients: 'fenugreek, neroli oil, Moroccan argan oil, rosemary, moringa, vitamin E.',
//     usage: 'Apply to scalp.'
//   },
//   {
//     name: 'The healing salve',
//     price: 15500,
//     category: 'Body Butter',
//     image: '/products/7.jpg',
//     description: 'Deep hydration prep.',
//     ingredients: 'Hyaluronic Acid.',
//     usage: 'Apply with cotton pad.'
//   },
//   {
//     name: 'Illumine Luxe',
//     price: 22000,
//     category: 'Serums',
//     image: '/products/8.jpg',
//     description: 'Luxury serum.',
//     ingredients: 'Arbutin, glutahione, bearberry extract,squalene, kojic dipp, bergamot',
//     usage: 'Apply 2 drops daily.'
//   },
//   {
//     name: 'Ivory Salve',
//     price: 21000,
//     category: 'Treatment',
//     image: '/products/9.jpg',
//     description: 'Soothing balm.',
//     ingredients: 'Shea Butter.',
//     usage: 'Apply to dry areas.'
//   },
//   {
//     name: 'Plump Drops',
//     price: 14500,
//     category: 'Serums',
//     image: '/products/10.jpg',
//     description: 'Instant hydration.',
//     ingredients: 'Collagen.',
//     usage: 'Pat into skin.'
//   },
//   {
//     name: 'Revive Exfoliant (Deep)',
//     price: 13000,
//     category: 'Exfoliant',
//     image: '/products/11.jpg',
//     description: 'Intense exfoliation.',
//     ingredients: 'Walnut Shells.',
//     usage: 'Scrub once a week.'
//   },
//   {
//     name: 'Revive Exfoliant',
//     price: 13000,
//     category: 'Exfoliant',
//     image: '/products/12.jpg',
//     description: 'Gentle scrubbing.',
//     ingredients: 'Sugar.',
//     usage: 'Scrub twice a week.'
//   },
//   {
//     name: 'Satin Skin Salve',
//     price: 9500,
//     category: 'Treatment',
//     image: '/products/13.jpg',
//     description: 'Softens rough skin.',
//     ingredients: 'Cocoa Butter.',
//     usage: 'Apply to elbows.'
//   },
//   {
//     name: 'The Healing Salve',
//     price: 10000,
//     category: 'Treatment',
//     image: '/products/14.jpg',
//     description: 'Recover from irritation.',
//     ingredients: 'Turmeric.',
//     usage: 'Apply to redness.'
//   },
//   {
//     name: 'Ultra Facial Cream',
//     price: 15500,
//     category: 'Face Care',
//     image: '/products/15.jpg',
//     description: 'Daily moisture barrier.',
//     ingredients: 'Ceramides.',
//     usage: 'Apply daily.'
//   }
// ];

// const importData = async () => {
//   try {
//     await Product.deleteMany();
//     await Product.insertMany(products);
//     console.log('Data Imported!');
//     process.exit();
//   } catch (error) {
//     console.error(`${error}`);
//     process.exit(1);
//   }
// };

// importData();