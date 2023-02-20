module.exports = (sequelize, DataTypes, Model) => {
  class EmailVerification extends Model {}

  EmailVerification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenType: {
        // Token type: Registration, PasswordUpdate
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date().toISOString(),
      },
    },
    {
      sequelize,
      modelName: 'token',
    }
  );

  return EmailVerification;
};
