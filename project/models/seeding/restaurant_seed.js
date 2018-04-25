const models = require('../models');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
var res1 = new models.Restaurant({
    name: "Dine Hard",
    doorNumber: "37",
    postcode: "S6 5BP",
    phoneNo: "01912401786",
    description: "We have gone to great lengths to try and use only local produce and suppliers, thus ensuring our quality is always of a very high standard for our guests to enjoy. At Dine Hard you are always guaranteed a warm welcome.",
    cuisines: "Italian",
    lat: 53.39476,
    lng: -1.50796,
    photoURL: "null",
    price: 10,
    tags: "homely, warm, good ambiance, bubbly, lovely, italian, newcastle, welcoming, dine, hard",
    rating: 7,
    noRating: 1,
    websiteURL: "http://howarth.io"
});

res1.save(function (err, res1) {
    if (err) return console.error(err);

});

var res2 = new models.Restaurant({
    name: "The Wonder Inn",
    doorNumber: "37",
    postcode: "s1 4dg",
    phoneNo: "07504988541",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Chinese",
    lat: 53.3806721,
    lng: -1.4822935,
    photoURL: "null",
    price: 2,
    tags: "homely, warm, good ambiance, good, radiant, great, chinese, sheffield, acceptable, excellent, the, wonder, inn",
    rating: 0,
    noRating: 0,
    websiteURL: "http://harryehowarth.com"
});

res2.save(function (err, res2) {
    if (err) return console.error(err);

});

var res3 = new models.Restaurant({
    name: "Harry's Kebab Shop",
    doorNumber: "21",
    postcode: "s3 7sy",
    phoneNo: "07502283141",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Korean",
    lat: 53.378378,
    lng: -1.479892,
    photoURL: "null",
    price: 2,
    tags: "homely, warm, good ambiance, good, radiant, great, korean, sheffield, acceptable, excellent, harry, harrys, kebab, shop, chips, pizza, cheap",
    rating: 0,
    noRating: 0,
    websiteURL: "http://google.com"
});

res3.save(function (err, res3) {
    if (err) return console.error(err);

});

var res4 = new models.Restaurant({
    name: "Adam's Potato Dungeon",
    doorNumber: "28",
    postcode: "S8 0BN",
    phoneNo: "07502283141",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Thai",
    lat: 53.33844,
    lng: -1.48711,
    photoURL: "null",
    price: 1,
    tags: "homely, warm, good ambiance, good, great, thai, sheffield, acceptable, excellent, potato, chips, delicious, fryup, adam, potato, dungeon, adams",
    rating: 0,
    noRating: 0,
    websiteURL: "http://example.com"
});

res4.save(function (err, res4) {
    if (err) return console.error(err);

});

var res5 = new models.Restaurant({
    name: "Victoria's Haven",
    doorNumber: "72",
    postcode: "s9 2ep",
    phoneNo: "07502283141",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Indian",
    lat: 53.37735,
    lng: -1.42184,
    photoURL: "null",
    price: 4,
    tags: "homely, warm, good ambiance, good, radiant, great, indian, sheffield, acceptable, excellent, haven, delight, superior, victoria, victorias",
    rating: 0,
    noRating: 0,
    websiteURL: "http://isitchristmas.com"
});

res5.save(function (err, res5) {
    if (err) return console.error(err);

});

var res6 = new models.Restaurant({
    name: "Fabio's Focaccia",
    doorNumber: "1",
    postcode: "s10 1gy",
    phoneNo: "07108283231",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Italian",
    lat: 53.38376,
    lng: -1.50736,
    photoURL: "null",
    price: 4,
    tags: "homely, warm, good ambiance, good, radiant, great, italian, sheffield, acceptable, excellent, bread, yummy, tasty, fabio, fabios, facaccia",
    rating: 0,
    noRating: 0,
    websiteURL: "http://help.com"
});

res6.save(function (err, res6) {
    if (err) return console.error(err);

});
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/