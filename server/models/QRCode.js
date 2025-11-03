const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const QRCode = sequelize.define(
  "QRCode",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: "Please provide userId" } },
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { msg: "Please provide data" } },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'text',
      validate: { isIn: [['url', 'text']] },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { tableName: "qrcodes", timestamps: true }
);
module.exports = QRCode;
