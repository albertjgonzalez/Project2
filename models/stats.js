module.exports = function(sequelize, DataTypes) {
  var Stats = sequelize.define("stats", {
    city: DataTypes.STRING,
    population: DataTypes.STRING,
    homicide: DataTypes.STRING,
    robbery: DataTypes.STRING, 
    assault: DataTypes.STRING, 
    theft: DataTypes.STRING, 
    vehicleTheft: DataTypes.STRING,
    violentCrime: DataTypes.STRING,
    rape: DataTypes.STRING,
    propertyCrime: DataTypes.STRING,
    burglary: DataTypes.STRING,
    robbery: DataTypes.STRING,
    arson: DataTypes.STRING
  }, {
    timestamps: false
});
  return Stats;
};
