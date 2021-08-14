/* Author Parth Thummar */
const collectorService = require("../services/collectorService");
const Response = require("../models/response");

const getCollectionRequestByPincode = async () => {
  try {
    const { payload, message } =
      await collectorService.getCollectionRequestByPincode();
    if (payload == undefined) {
      var response = new Response("No request found", false, payload, 400);
    } else {
      var response = new Response(message, true, payload, 200);
    }
  } catch (error) {
    var response = new Response("Internal server error", false, undefined, 500);
  }
  return response;
};

const getPickedCollectionRequest = async (userId) => {
  try {
    const { payload, message } =
      await collectorService.getPickedCollectionRequest(userId);
    if (payload == undefined) {
      var response = new Response("No request found", false, payload, 400);
    } else {
      var response = new Response(message, true, payload, 200);
    }
  } catch (error) {
    var response = new Response("Internal server error", false, undefined, 500);
  }
  return response;
};

const pickDeposit = async (id, userId) => {
  try {
    const { payload, message } = await collectorService.pickDeposit(id, userId);
    if (payload == undefined) {
      var response = new Response(message, false, payload, 500);
    } else {
      var response = new Response(message, true, payload, 200);
    }
  } catch (error) {
    console.log(error);
    var response = new Response("Internal server error", false, undefined, 500);
  }
  return response;
};

const updateDepositStatus = async (id) => {
  try {
    if (Object.keys(body).length == 0) {
      var response = new Response(
        "Bad request. Please send request body.",
        false,
        undefined,
        404
      );
    } else {
      const { payload, message } = await collectorService.updateDepositStatus(
        id
      );
      if (payload == undefined) {
        var response = new Response(message, false, payload, 500);
      } else {
        var response = new Response(message, true, payload, 200);
      }
    }
  } catch (error) {
    var response = new Response("Internal server error", false, undefined, 500);
  }
  return response;
};

const discardPickedDeposit = async (id) => {
  try {
    const { payload, message } = await collectorService.discardPickedDeposit(
      id
    );
    console.log(payload);
    if (payload == undefined) {
      var response = new Response("Deposit Not Found", false, payload, 400);
    } else {
      var response = new Response(message, true, payload, 200);
    }
  } catch (error) {
    var response = new Response("Internal server error", false, undefined, 500);
  }
  return response;
};

module.exports = {
  getCollectionRequestByPincode,
  getPickedCollectionRequest,
  pickDeposit,
  updateDepositStatus,
  discardPickedDeposit,
};
