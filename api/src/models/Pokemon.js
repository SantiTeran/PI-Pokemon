const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER,
      },
      defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
      created: {
        type: DataTypes.STRING, 
        defaultValue: "true",
      },
    },
    {
      timestamps: false,
    }
  );
};
