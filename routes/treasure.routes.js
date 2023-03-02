const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {uploader} = require("../config/cloudinary");
const Treasure = require("../models/Treasure.model");
const Item = require("../models/Item.model");


router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  res.json({ imageUrl: req.file.path });
});


//  POST /api/treasure  -  Creates a new treasure
router.post("/new-treasure", (req, res, next) => {
  const { owner, title, description, imageUrl, street, zipcode, city } = req.body;

  Treasure.create({ owner, title, description, imageUrl, street, zipcode, city, items: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/treasure -  Retrieves the whole treasure list
router.get("/treasure", (req, res, next) => {
  Treasure.find()
    .populate("items")
    .then((allTreasure) => res.json(allTreasure))
    .catch((err) => res.json(err));
});

//  GET /api/treasure/:treasureId -  Retrieves a specific treasure by id
router.get("/treasure/:treasureId", (req, res, next) => {
  const { treasureId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(treasureId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Treasure document has `items` array holding `_id`s of Item documents
  // We use .populate() method to get swap the `_id`s for the actual Item documents
  Treasure.findById(treasureId)
    .populate("items")
    .then((treasure) => res.status(200).json(treasure))
    .catch((error) => res.json(error));
});

// PUT  /api/treasure/:treasureId  -  Updates a specific treasure by id
router.put("/treasure/:treasureId", (req, res, next) => {
  const { treasureId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(treasureId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Treasure.findByIdAndUpdate(treasureId, req.body, { new: true })
    .then((updatedTreasure) => res.json(updatedTreasure))
    .catch((error) => res.json(error));
});

// DELETE  /api/treasure/:treasureId  -  Deletes a specific treasure by id
router.delete("/treasure/:treasureId", (req, res, next) => {
  const { treasureId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(treasureId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Treasure.findByIdAndRemove(treasureId)
    .then(() =>
      res.json({
        message: `Treasure with ${treasureId} was removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
