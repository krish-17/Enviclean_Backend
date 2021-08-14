/* Author:Parth Thummar */
const Depositor = require("../models/depositor");

const getCollectionRequestByPincode = async () => {
  try {
    const allCollectionRequest = await Depositor.findAll({
      order: [["id", "DESC"]],
      raw: true,
    });
    return { payload: allCollectionRequest, message: "Request found" };
  } catch (error) {
    console.log(error);
    return { payload: undefined, message: error.message };
  }
};

const getPickedCollectionRequest = async (userId) => {
  try {
    const pickedCollectionRequest = await Depositor.findAll({
      where: {
        pickedBy: userId,
      },
      raw: true,
    });
    return { payload: pickedCollectionRequest, message: "Request found" };
  } catch (error) {
    console.log(error);
    return { payload: undefined, message: error.message };
  }
};

const pickDeposit = async (id, userId) => {
  try {
    // const pickedRequest={
    //     userId:userId,
    //     id:id
    // };
    // await Collector.create(pickedRequest);

    updateDepositStatus(id, userId);
    return { payload: { id: id }, message: "Deposit picked successfully." };
  } catch (error) {
    console.log(error);
    return { payload: undefined, message: error.message };
  }
};

const updateDepositStatus = async (id, userId) => {
  try {
    const depositRequest = await Depositor.findOne({ where: { id: id } });
    depositRequest.status = true;
    depositRequest.pickedBy = userId;
    await depositRequest.save();
    return { payload: id, message: "Deposit updated successfully." };
  } catch (error) {
    return { payload: undefined, message: error.message };
  }
};

const discardPickedDeposit = async (id) => {
  try {
    const depositRequest = await Depositor.findOne({ where: { id: id } });
      depositRequest.status = false;
      depositRequest.pickedBy = "none";
      await depositRequest.save();

    return { payload: id, message: "Deposit deleted successfully." };
  } catch (error) {
    console.log(error);
    return { payload: undefined, message: error.message };
  }
};

module.exports = {
  getCollectionRequestByPincode,
  getPickedCollectionRequest,
  pickDeposit,
  updateDepositStatus,
  discardPickedDeposit,
};
