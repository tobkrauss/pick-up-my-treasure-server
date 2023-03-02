const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../models/Item.model");
const Treasure = require("../models/Treasure.model");

//  POST /api/items  -  Creates a new item
router.post("/items", (req, res, next) => {
    const { title, description, category, imageUrl, condition, treasureId } = req.body;
    Item.create({ title, description, category, imageUrl, condition, treasure: treasureId })
        .then((newItem) => {
            console.log("new item is", newItem)
            return Treasure.findByIdAndUpdate(treasureId, {
                $push: { items: newItem._id }
            });
        })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
});

//  GET /api/items/:itemId -  Retrieves a specific Item by id
router.get("/items/:itemId", (req, res, next) => {
    const { itemId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    Item.findById(itemId)
      .then((item) => res.status(200).json(item))
      .catch((error) => res.json(error));
  });
  

// PUT  /api/items/:itemId  -  Updates a specific item by id
router.put("/items/:itemId", (req, res, next) => {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Item.findByIdAndUpdate(itemId, req.body, { new: true })
        .then((updatedItem) => res.json(updatedItem))
        .catch((error) => res.json(error));
});

// DELETE  /api/items/:itemId  -  Deletes a specific item by id
router.delete("/items/:itemId", (req, res, next) => {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Item.findByIdAndRemove(itemId)
        .then(() =>
            res.json({
                message: `Item with ${itemId} was removed successfully.`,
            })
        )
        .catch((error) => res.json(error));
});



module.exports = router;
