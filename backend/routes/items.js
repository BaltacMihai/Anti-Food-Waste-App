const express = require("express");
const router = express.Router();
const itemController = require("./../controllers").item;

router.get("/getAllItemsByUserId/:userId", itemController.getAllItemsByUserId);
router.get("/getAllItemsByItemId/:itemId", itemController.getAllItemsByItemId);
router.get("/getAllItemsByName/:name", itemController.getAllItemsByName);
router.get("/getAllItems", itemController.getAllItems);
router.get("/deleteItemById/:itemId/:userId", itemController.deleteItemById);
router.post("/postItem", itemController.postItem);
router.put("/putItem", itemController.putItems);

module.exports = router;
