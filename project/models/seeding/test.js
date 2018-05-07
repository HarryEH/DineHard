const bcrypt = require('bcrypt');


bcrypt.hash("fuckoff", 10, function(err, hash) {
    bcrypt.compare("fuckoff", hash, function(err, res) {
        console.log(res);
    });

    bcrypt.compare("fuckoff2", hash, function(err, res) {
        console.log(res);
    });
});