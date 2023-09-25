// models/parking.js
module.exports = (sequelize, DataTypes) => {
    const Parking = sequelize.define('Parking', {
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberPlate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      parkingFee: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return Parking;
  };
  