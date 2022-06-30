var Parcel = require("../models/parcel");
var handleError = require("../helpers/handleError");

module.exports = {
  getallParcels: async (req, res) => {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
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
      location: req.body.location,
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
      $push: { logs: parcel },
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
  listSearch: async (req, res) => {
    const code = parseInt(req.params.code);
    let data = await Parcel.find({
      code: code,
    });
    res.json(data);
  },
};
