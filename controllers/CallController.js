const callModel = require("../models/Call");

const CallController = {
  getAllCallHistory: async (req, res) => {
    const request = { ...req.body };
    try {
      const result = await callModel.getAllCallHistory(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  addNewCall: async (req, res) => {
    const request = { ...req.body };
    try {
      const result = await callModel.addNewCall(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  updateCall: async (req, res) => {
    const request = { ...req.body, id: req.params.call_id };
    try {
      const result = await callModel.updateCall(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },

  deleteCall: async (req, res) => {
    const request = req.params.call_id;
    try {
      const result = await callModel.updateCall(request);
      res.status(result.statusCode).send(result);
    } catch (err) {
      res.status(err.statusCode).send(err);
    }
  },
};

module.exports = CallController;
