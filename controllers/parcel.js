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
    if (req.body.code) {
      parcel.code = req.body.code;
    }
    if (req.body.status) {
      parcel.status = req.body.status;
    }
    if (req.body.remarks) {
      parcel.remarks = req.body.remarks;
    }
    const result = await parcel.save();
    return res
      .status(200)
      .json({ status: "success", data: { parcel: result } });
  },

  deleteParcel: async (req, res) => {
    const parcelId = req.params.id;
    await Parcel.deleteOne({ _id: parcelId });
    return res
      .status(200)
      .json({ status: "sucess", message: "parcel cancelled" });
  },
};
