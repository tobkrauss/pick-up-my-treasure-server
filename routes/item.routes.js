const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../models/Item.model");
const Treasure = require("../models/Treasure.model");

//  POST /api/items  -  Creates a new item
router.post("/items", (req, res, next) => {
  const { title, description, category, imageUrl, state, treasureId } = req.body;

  Item.create({ title, description, category, imageUrl, state, treasureId })
    .then((newItem) => {
      return Treasure.findByIdAndUpdate(treasureId, {
        $push: { items: newItem._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
