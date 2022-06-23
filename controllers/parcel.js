var Parcel = require("../models/parcel");
var handleError = require("../helpers/handleError");

module.exports = {
  getallParcels: async (req, res) => {
    const parcels = await Parcel.find();
    return res.json(parcels);
  },

  getSingleParcel: async (req, res) => {
    const parcels = await Parcel.findById(req.params.id);
    return res.json(parcels);
  },

  createParcel: async (req, res) => {
    const parcelDetails = {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
    };
    const parcels = new Parcel(parcelDetails);
    const result = await parcels.save();
    return res.status(200).json(result);
  },

  updateParcel: async (req, res) => {
    const parcelId = req.params.id;
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({
        message: "Parcel not found",
      });
    }
    const updatedParcel = await Parcel.findByIdAndUpdate(parcelId, {
      ...req.body,
    });
    return res.json(updatedParcel);
  },

  deleteParcel: async (req, res) => {
    const parcelId = req.params.id;
    const parcel = await Parcel.findById(parcelId);
    if (!parcel) {
      return res.status(404).json({
        message: "Parcel not found",
      });
    }
    await Parcel.deleteOne({ _id: parcelId });
    return res.json({ status: "sucess", message: "Parcel cancelled" });
  },

  //search functionality
  listSearch: (req, res) => {
    //create query object to hold search value and code value
    const query = {};
    //assign search value to query.name
    if (req.query.search) {
      //using regex = regular expression
      //i is for case insensitivity
      query.name = { $regex: req.query.search, $options: "i" };
      //assign code value to query.code
      if (req.query.code && req.query.code != "All") {
        query.code = req.query.code;
      }
      //find the parcel based on query object wih 2 properties
      //search and code
      Parcel.find(query, (err, parcel) => {
        if (err) {
          return res.json({
            error: handleError(err),
          });
        }
        res.json(parcel);
      });
    }
  },
};
