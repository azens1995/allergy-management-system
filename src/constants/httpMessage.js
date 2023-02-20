const message = {
  LOGIN_SUCCESS: 'Logged in successfully',
  INCORRECT_EMAIL_PASSWORD: 'Email or Password is not correct',
  INVALID_REQUEST: 'Invalid Request. Please check your payload.',
  REGISTRATION_SUCCESS:
    'Registration is successful. Please login using the registered email and password',
  ALLERGY_CREATED: 'Allergy created successfully',
  ALLERGY_RETRIEVED: 'Allergy retrieved successfully',
  ALLERGY_UPDATED: 'Allergy updated successfully',
  ALLERGY_DELETED: 'Allergy deleted successfully',
  TOKEN_REFRESHED: 'Token refreshed successfully',
};

const errors = {
  FILE_REQUIRED: 'File is required. Please upload valid image.',
  VALID_IMAGE: 'Please upload valid image',
  VALID_ID: 'Please provide valid Id',
};

module.exports = { message, errors };
