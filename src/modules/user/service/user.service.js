const userRepository = require('../repository/user.repository');
const { isValidData, isValidEmail } = require('../../../utils/validation');
const {
  generateTokens,
  validateRefreshToken,
} = require('../../../utils/tokenUtils');
const {
  securePassword,
  verifyHashedPassword,
} = require('../../../utils/passwordUtils');

class UserService {
  constructor() {}

  // Create new user registration
  async registerUser(user) {
    // 1. Check if all the inputs are valid
    const { firstName, lastName, email, password } = user;
    if (
      !isValidData(firstName) ||
      !isValidData(lastName) ||
      !isValidData(email) ||
      !isValidData(password)
    ) {
      throw new Error(
        'Invalid data. Please provide required fields: firstName, lastName, email, password'
      );
    }

    if (!isValidEmail(email)) {
      throw new Error(
        'Invalid email provided. Please provide valid email address'
      );
    }
    const userExist = await this.findUserByEmail(email);
    if (userExist) {
      throw new Error('User already exist with the provided email');
    }
    const hashedPassword = await securePassword(password);
    const userToSave = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    const userResponse = userRepository.addUser(userToSave);
    return userResponse;
  }

  async loginUser(email, password) {
    if (!isValidData(email) || !isValidData(password)) {
      throw new Error(`Please provide valid email or password`);
    }

    if (!isValidEmail(email)) {
      throw new Error(
        `Invalid email address provided. Please provide valid email.`
      );
    }
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new Error(`User does not exist with the provided email ${email}`);
    }
    const passwordCheck = await verifyHashedPassword(password, user.password);
    if (!passwordCheck) {
      throw new Error(`Incorrect email or password. Please check your input.`);
    }
    const tokens = await generateTokens(user);
    return tokens;
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new Error('Invalid token provided.');
    }
    const refreshTokenCheck = await validateRefreshToken(refreshToken);
    if (refreshTokenCheck.error) {
      throw new Error('The token provided is not valid.');
    }
    const user = {
      _id: refreshTokenCheck.tokenDetails._id,
      email: refreshTokenCheck.tokenDetails.email,
    };
    const tokens = await generateTokens(user);
    return tokens;
  }

  async findUserByEmail(email) {
    return await userRepository.findUserByEmail(email);
  }
}

module.exports = new UserService();
