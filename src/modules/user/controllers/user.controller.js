const logger = require('../../../utils/logger');
const { status } = require('../../../constants/httpCode');
const userService = require('../service/user.service');
const { message } = require('../../../constants/httpMessage');

const registerUser = async (req, res) => {
  try {
    await userService.registerUser(req.body);
    return res.status(status.CREATED).json({
      status: status.CREATED,
      data: null,
      message: message.REGISTRATION_SUCCESS,
    });
  } catch (err) {
    logger.error(err);
    res
      .status(status.BAD_REQUEST)
      .json({ status: status.BAD_REQUEST, data: null, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await userService.loginUser(email, password);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: response,
      message: message.LOGIN_SUCCESS,
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(status.BAD_REQUEST)
      .json({ status: status.BAD_REQUEST, data: null, message: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const tokens = await userService.refreshAccessToken(req.body.refreshToken);
    return res.status(status.SUCCESS).json({
      status: status.SUCCESS,
      data: tokens,
      message: message.TOKEN_REFRESHED,
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(status.BAD_REQUEST)
      .json({ status: status.BAD_REQUEST, data: null, message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
