var express = require("express");
var router = express.Router();
var {
  parcelValidation,
  editParcelValidation,
} = require("../validations/index");
var { wrapAsync } = require("../helpers/catchHandler");
var handleError = require("../helpers/handleError");
var { checkLogin } = require("../middlewares/checkLogin");
var parcelController = require("../controllers/parcel");

//post parcel
router.post(
  "/",
  parcelValidation(),
  handleError,
  wrapAsync(parcelController.createParcel)
);

//get all parcels
router.get("/", wrapAsync(parcelController.getallParcels));

//get single parcel
router.get("/:id", wrapAsync(parcelController.getSingleParcel));

//update parcel
router.put(
  "/:id",
  editParcelValidation(),
  handleError,
  wrapAsync(parcelController.updateParcel)
);

//delete parcel
router.delete("/:id", wrapAsync(parcelController.deleteParcel));

//search parcel
router.get("/search/:code", wrapAsync(parcelController.listSearch));

module.exports = router;
