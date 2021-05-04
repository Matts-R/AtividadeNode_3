var DataTypes = require("sequelize").DataTypes;
var _Agencia = require("./Agencia");
var _Banco = require("./Banco");
var _Cliente = require("./Cliente");

function initModels(sequelize) {
  var Agencia = _Agencia(sequelize, DataTypes);
  var Banco = _Banco(sequelize, DataTypes);
  var Cliente = _Cliente(sequelize, DataTypes);

  Agencia.belongsTo(Banco, { as: "banco", foreignKey: "banco_id"});
  Banco.hasMany(Agencia, { as: "Agencia", foreignKey: "banco_id"});

  return {
    Agencia,
    Banco,
    Cliente,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
