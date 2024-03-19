const Category = require("../models/category");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

// Display the site welcome page.
exports.index = asyncHandler(async (req, res, next) => {
  // Get details of categories and items (in parallel)
  const [numCategories, numItems] = await Promise.all([
    Category.countDocuments({}).exec(),
    Item.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Fishbowl Home",
    category_count: numCategories,
    item_count: numItems,
  });
});

// Display list of all Categories.
exports.category_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category list");
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create GET");
});

// Handle Category create on POST.
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create POST");
});

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete GET");
});

// Handle Category delete on POST.
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category delete POST");
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update GET");
});

// Handle Category update on POST.
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category update POST");
});
