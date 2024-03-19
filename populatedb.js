#! /usr/bin/env node

console.log(
  'This script populates some items and categories to the database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory_application?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function itemCreate(
  index,
  name,
  description,
  category,
  unit_price,
  stock
) {
  const item = new Item({
    name: name,
    description: description,
    category: category,
    unit_price: unit_price,
    stock: stock,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function categoryCreate(index, name, description) {
  const category = new Category({
    name: name,
    description: description,
  });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      0,
      "Bitterling",
      "These fish are so small, they can fit their entire body in the palm of your hand.",
      [categories[0]],
      1.5,
      1
    ),
    itemCreate(
      1,
      "Koi",
      "Though typically pale in color, these aquarium fish also can be found with rather beautiful patterns.",
      [categories[1]],
      3.0,
      3
    ),
    itemCreate(
      2,
      "Tilapia",
      "Wherever the waters are warm, the tilapia can be found. It is a highly adaptable river fish.",
      [categories[0], categories[1]],
      1.15,
      2
    ),
    itemCreate(
      3,
      "Arowana",
      "They are known for their large scales and the hair that sticks out from their lower lips.",
      [categories[0]],
      150.0,
      10
    ),
    itemCreate(
      4,
      "Ocean sunfish",
      "Lacking a tail fin, they cannot swim particularly quickly, which is an odd bit of anatomical detriment.",
      [categories[2]],
      39.99,
      2
    ),
  ]);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(
      0,
      "River",
      "A river is a body of water in the Animal Crossing series that begins on one side of the town or island and empties into the sea at the other side."
    ),
    categoryCreate(
      1,
      "Pond",
      "The pond, also called a holding pond, is the smallest body of water in a Animal Crossing series town."
    ),
    categoryCreate(
      2,
      "Sea",
      "The sea is the body of saltwater surrounding the player's town or island in the Animal Crossing series."
    ),
  ]);
}
