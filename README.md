# iw-assignment
intelligent web assignment

# git for the idiots
git pull;
git add -A;
git commit -vam "message";
git pull;
git push;


git status;


if there have been changes to master when you are on your own branch & they are unlikely to conflict call


git fetch origin;

git rebase origin/master;

# database for the idiots (more understandable though)

IN YOUR COMMAND LINE IN THE MONGO SHELL

use mydb;
db.users.drop();
db.restaurants.drop();
db.cuisines.drop();
db.restaurantcuisines.drop();
db.reviews.drop();

THEN RUN

node models/seeding/users_seed.js

node models/seeding/restaurants_seed.js

node models/seeding/reviews_seed.js

node models/seeding/cuisines_seed.js

node models/seeding/restaurants_cuisines_seed.js
