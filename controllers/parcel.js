var Parcel = require("../models/parcel");

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
        message: "parcel not found",
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
        message: "parcel not found",
      });
    }
    await Parcel.deleteOne({ _id: parcelId });
    return res.json({ status: "sucess", message: "parcel cancelled" });
  },
};
