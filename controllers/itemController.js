const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display detail page for a specific Item.
exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").exec();

  if (item === null) {
    // No results.
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", { title: item.name, item: item });
});

// Display Item create form on GET.
exports.item_create_get = asyncHandler(async (req, res, next) => {
  // Get all categories, which we can use for adding to our item.
  const allCategories = await Category.find().sort({ name: 1 }).exec();

  res.render("item_form", {
    title: "Create Item",
    categories: allCategories,
  });
});

// Handle Item create on POST.
exports.item_create_post = [
  // Convert the categories to an array.
  (req, res, next) => {
    if (!Array.isArray(req.body.category)) {
      req.body.category =
        typeof req.body.category === "undefined" ? [] : [req.body.category];
    }
    next();
  },

  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Must choose at least one category.")
    .trim()
    .isArray({ min: 1 })
    .escape(),
  body("category.*").escape(),
  body("unit_price")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Unit price must not be empty.")
    .isNumeric()
    .withMessage("Unit price contains non-numeric characters."),
  body("stock")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Stock must not be empty. If the stock is 0, write '0'.")
    .isNumeric()
    .withMessage("Unit price contains non-numeric characters."),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an Item object with escaped and trimmed data.
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      unit_price: req.body.unit_price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all categories for form.
      const allCategories = await Category.find().sort({ name: 1 }).exec();

      // Mark our selected categories as checked.
      for (const category of allCategories) {
        if (item.category.includes(category._id)) {
          category.checked = "true";
        }
      }
      res.render("item_form", {
        title: "Create Item",
        categories: allCategories,
        item: item,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save item.
      await item.save();
      res.redirect(item.url);
    }
  }),
];

// Display Item delete form on GET.
exports.item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  res.render("item_delete", { title: "Item Delete", item: item });
});

// Handle Item delete on POST.
exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.body.itemid);
  res.redirect("/catalog");
});

// Display Item update form on GET.
exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update GET");
});

// Handle Item update on POST.
exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update POST");
});
