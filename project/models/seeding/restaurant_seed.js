const models = require('../models');

models.connect();

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
var res1 = new models.Restaurant({
    name: "Dine Hard",
    doorNumber: "37",
    postcode: "NE2 4RQ",
    phoneNo: "01912401786",
    description: "We have gone to great lengths to try and use only local produce and suppliers, thus ensuring our quality is always of a very high standard for our guests to enjoy. At Dine Hard you are always guaranteed a warm welcome.",
    cuisines: "Italian",
    lat: 54.9857359,
    lng: -1.6080269,
    photoURL: "null",
    price: 10,
    tags: "homely, warm, good ambiance, bubbly, lovely, italian, newcastle, welcoming",
    rating: 3.14,
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
    tags: "homely, warm, good ambiance, good, radiant, great, chinese, sheffield, acceptable, excellent",
    rating: 4.37,
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
    tags: "homely, warm, good ambiance, good, radiant, great, korean, sheffield, acceptable, excellent, kebab, chips, pizza, cheap",
    rating: 2.67,
    websiteURL: "http://google.com"
});

res3.save(function (err, res3) {
    if (err) return console.error(err);

});

var res4 = new models.Restaurant({
    name: "Adam's Potato Dungeon",
    doorNumber: "28",
    postcode: "mk1 3tb",
    phoneNo: "07502283141",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Thai",
    lat: 52.006079,
    lng: -0.724614,
    photoURL: "null",
    price: 1,
    tags: "homely, warm, good ambiance, good, great, thai, sheffield, acceptable, excellent, potato, chips, delicious, fryup",
    rating: 6.9,
    websiteURL: "http://example.com"
});

res4.save(function (err, res4) {
    if (err) return console.error(err);

});

var res5 = new models.Restaurant({
    name: "Victoria's Haven",
    doorNumber: "72",
    postcode: "sl6 5er",
    phoneNo: "07502283141",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Indian",
    lat: 51.527397,
    lng: -0.754289,
    photoURL: "null",
    price: 4,
    tags: "homely, warm, good ambiance, good, radiant, great, indian, sheffield, acceptable, excellent, haven, delight, superior",
    rating: 5.72,
    websiteURL: "http://isitchristmas.com"
});

res5.save(function (err, res5) {
    if (err) return console.error(err);

});

var res6 = new models.Restaurant({
    name: "Fabio's Focaccia",
    doorNumber: "1",
    postcode: "nn2 6tm",
    phoneNo: "07108283231",
    description: "A warm welcome awaits you in this 16th century restaurant with rooms. The George is situated on the edge of the village green in Cavendish, positioned in between the popular villages of Clare and Long Melford and just a short drive from the timeless village of Lavenham.Since October 2010, co-owners Lewis Bennet & Bonnie Steel have achieved their 1st Rosette and four stars from the AA & Visit Britain tourist guides.The emphasis at The George is on the quality of food and customer service. The menus offer a wide range of dishes to suit all tastes and budgets. The menus change frequently and are guided by the seasons. We aim to use the highest quality, sustainably sourced ingredients and utilise our garden to grow seasonal items such as baby leaf, beetroot, edible flowers, tomatoes and herbs to use on the menu.",
    cuisines: "Italian",
    lat: 52.253276,
    lng: -0.941966,
    photoURL: "null",
    price: 4,
    tags: "homely, warm, good ambiance, good, radiant, great, italian, sheffield, acceptable, excellent, bread, yummy, tasty",
    rating: 5.72,
    websiteURL: "http://help.com"
});

res6.save(function (err, res6) {
    if (err) return console.error(err);

});
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/