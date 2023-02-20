module.exports = (sequelize, DataTypes, Model) => {
  class Allergy extends Model {}

  Allergy.init(
    {
      // Model attribute are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      causes: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      symptoms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      severity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      preventions: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      treatments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isHighRisk: {
        /* This is a boolean value that is set to false by default. */
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'allergy',
    }
  );
  return Allergy;
};
