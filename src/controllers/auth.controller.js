import httpStatus from "http-status";
import userService from "../services/user.service.js";
import tokenService from "../services/token.service.js";
import authService from "../services/auth.service.js";
import emailService from "../services/email.service.js";
import errorMessage from "../config/error.js";

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (err) {
    errorMessage(res, err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (err) {
    errorMessage(res, err);
  }
};

const logout = async (req, res) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const refreshTokens = async (req, res) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  } catch (err) {
    errorMessage(res, err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      req.body.email
    );
    await emailService.sendResetPasswordEmail(
      req.body.email,
      resetPasswordToken
    );
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
      req.user
    );
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    console.log(err.message);
    errorMessage(res, err);
  }
};

const verifyEmail = async (req, res) => {
  try {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (err) {
    errorMessage(res, err);
  }
};

const authController = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};

export default authController;
