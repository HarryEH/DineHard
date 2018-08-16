const models = require('../models');
var fs = require('fs');

models.connect();

var img1 = {data: fs.readFileSync("public/images/restTest1.jpg"), contentType: 'image/jpg'};
var img2 = {data: fs.readFileSync("public/images/restTest2.jpg"), contentType: 'image/jpg'};
var img3 = {data: fs.readFileSync("public/images/restTest3.jpg"), contentType: 'image/jpg'};
var img4 = {data: fs.readFileSync("public/images/restTest4.jpg"), contentType: 'image/jpg'};
var img5 = {data: fs.readFileSync("public/images/restTest5.jpg"), contentType: 'image/jpg'};
var img6 = {data: fs.readFileSync("public/images/restTest6.jpg"), contentType: 'image/jpg'};


imgs = [img5, img3, img1];

var res3 = new models.Restaurant({
    name: "Harry's Kebab Shop",
    doorNumber: "21",
    postcode: "s3 7sy",
    phoneNo: "07502283141",
    description: "Here at Harry's Kebab Shop we welcome you with warm arms and big hearts. We offer the best Korean cuisine available at all hours of the day, whether you have a hankering for pizza and chips at the early hours of the morning or just around noon - Harry's Kebab Shop is the place to be. The founder Mr H Bab has won numerous awards for his legendary dishes across the world, including his delicate chilli wrapped garlic chicken which claimed the 2017 Food Award of Excellance. We offer both a cosy environment to enjoy the best flavours of all of Korea along side an affordable price. Located just down the road from the infamous Diamond (a student building at the Sheffield of University) we are the best a man can get.",
    cuisines: "Korean",
    lat: 53.378378,
    lng: -1.479892,
    photoURL: imgs,
    price: 2,
    tags: "homely, warm, good ambiance, good, radiant, great, korean, sheffield, acceptable, excellent, harry, harrys, kebab, shop, chips, pizza, cheap",
    rating: 11,
    noRating: 2,
    websiteURL: "http://google.com"
});

res3.save(function (err, res3) {
    if (err) return console.error(err);

});

imgs = [img4, img2, img6];

var res4 = new models.Restaurant({
    name: "Adam's Potato Dungeon",
    doorNumber: "28",
    postcode: "S8 0BN",
    phoneNo: "07502283141",
    description: "A warm welcome awaits you when you come on down to Adam's Potato Dungeon. Where the food matches the name. That's right, we only sell Potatoes and Dungeons. A loving atmosphere will be discovered when you come knocking at the dungeon door, when many potatoes are harvested and fried to your satisfaction. Each potato is crafted by hand and lovingly moulded into the shape of your dreams; no request is too much to handle for the best (that's us). We offer a wide variety of cuts of potato from the red rooster to the roasted and toasted, which can all be served just to your liking in any form that you desire. This 12th century basement has been refurbished to be a caring and friendly restaurant for all families to enjoy. The restaurant is located directly underneath where the potatoes are grown and harvested so you can really feel at home with them as you witness the life drain from their sweet, sweet potato eyes.",
    cuisines: "Thai",
    lat: 53.33844,
    lng: -1.48711,
    photoURL: imgs,
    price: 1,
    tags: "homely, warm, good ambiance, good, great, thai, sheffield, acceptable, excellent, potato, chips, delicious, fryup, adam, potato, dungeon, adams",
    rating: 9,
    noRating: 2,
    websiteURL: "http://example.com"
});

res4.save(function (err, res4) {
    if (err) return console.error(err);

});

imgs = [img6, img1, img3];

var res5 = new models.Restaurant({
    name: "Victoria's Haven",
    doorNumber: "72",
    postcode: "s9 2ep",
    phoneNo: "07502283141",
    description: "This tranquil setting at Victoria's Haven is one that is rarely matched at any other location and one that is vastly sought after by everyone from miles around. The Indian sanctuary has been the world's leading lamb bhuna experts for the past sixteen years, and that's a long time! They have also been voted as the best Samosas in Sheffield 2016 three years in a row, as they have been unbeaten in both taste and appearance. The founder of Victoria's Haven is a lover of all things cocktaily, we have a Two-Four-One cocktail night every Friday which attracts all sorts of lads and gals (including dogs as we are dog friendly, ya know). Many have called us a paradise as we are located just down from Eden road and only the best food is found within. We cannot wait to see your lovely face coming through our pearly gates when you next visit Victoria's Haven.",
    cuisines: "Indian",
    lat: 53.37735,
    lng: -1.42184,
    photoURL: imgs,
    price: 4,
    tags: "homely, warm, good ambiance, good, radiant, great, indian, sheffield, acceptable, excellent, haven, delight, superior, victoria, victorias",
    rating: 12,
    noRating: 2,
    websiteURL: "http://isitchristmas.com"
});

res5.save(function (err, res5) {
    if (err) return console.error(err);

});

imgs = [img3, img5, img1];

var res6 = new models.Restaurant({
    name: "Fredrick's Focaccia",
    doorNumber: "1",
    postcode: "s10 1gy",
    phoneNo: "07108283231",
    description: "Here at Fredrick's Focaccia we have the best Italian bakery goods from all of Italy in our one and only focaccia bakery where the only thing better than our focaccia is Fredrick himself. Our baked goods are both served with a cherry on top and also a smile. We love to get back to our roots, and so all our ingredients are imported from the magnificent land of Italy where all the best ingredients come from. We then take these ingredients and mould them into the heavenly creations that you can find only at Fredrick's Focaccia. Our restaurant takes place within a beautiful 17th Century villa which has been kept in all its glory and still has the original clay baked oven used by great King Charles VI himself. We cannot wait to welcome your with warm loaves and open arms when you join us at Fredrick's Focaccia.",
    cuisines: "Italian",
    lat: 53.38376,
    lng: -1.50736,
    photoURL: imgs,
    price: 4,
    tags: "homely, warm, good ambiance, good, radiant, great, italian, sheffield, acceptable, excellent, bread, yummy, tasty, fabio, fabios, facaccia",
    rating: 20,
    noRating: 3,
    websiteURL: "http://help.com"
});

res6.save(function (err, res6) {
    if (err) return console.error(err);

});
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/