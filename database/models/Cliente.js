const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cliente', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CPF: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Sexo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Salario: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    Contato: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Cliente',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
