const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Agencia', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_agencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    banco_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Banco',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Agencia',
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
      {
        name: "Agencia_FK",
        using: "BTREE",
        fields: [
          { name: "banco_id" },
        ]
      },
    ]
  });
};
