const { sequelize } = require("../database/models");
const Banco = require("../database/models/init-models")(sequelize).Banco;

class BancoController {
  async createBanco(req, res) {
    const bancoData = req.body;
    const transaction = await sequelize.transaction();
    try {
      const bancoCreated = await Banco.create(
        {
          CNPJ: bancoData.cpnj,
          razao_social: bancoData.razao_social,
          contato: bancoData.contato,
        },
        { transaction }
      );

      await transaction.commit();

      res.status(201).send({ status: true, bancoCreated });
    } catch (error) {
      await transaction.rollback();

      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }

  async getAllBancos(req, res) {
    try {
      const result = await Banco.findAll();

      if (result.length > 0) {
        res.status(200).json({ status: true, result });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Nenhum Banco foi encontrado" });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error,
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const result = await Banco.findByPk(id);
      if (result != null) {
        const banco = result.dataValues;

        res.status(200).json({ status: true, banco });
      } else {
        res.status(404).json({
          status: false,
          message: `Nenhum Banco foi encontrado com o id: ${id}`,
        });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  }

  async updateBanco(req, res) {
    const { id } = req.params;
    const { cnpj, razao_social, contato } = req.body;

    try {
      let banco = await Banco.findByPk(id);
      if (banco !== null) {
        const transaction = await sequelize.transaction();

        banco.cnpj = cnpj == null ? banco.cnpj : cpnj;
        banco.razao_social =
          razao_social == null ? banco.razao_social : razao_social;
        banco.contato = contato == null ? banco.contato : contato;

        const BancoUpdated = await Banco.save({ transaction });

        await transaction.commit();

        res.status(200).json({ status: true, BancoUpdated });
      } else {
        res.status(400).json({
          status: false,
          message: `No object was found with the ${id} id`,
        });
      }
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      res.status(400).json({
        status: false,
        message: `Error: ${err}`,
      });
    }
  }

  async deleteBanco(req, res) {
    const { id } = req.params;

    try {
      const Banco = await Banco.findByPk(id);

      if (Banco !== null) {
        const transaction = await sequelize.transaction();

        await Banco.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ status: true, message: "Banco deleted" });
      } else {
        await transaction.rollback();

        res.status(404).json({
          status: false,
          message: `There is no Banco with this id: ${id}`,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: `Error: ${error}`,
      });
    }
  }
}

module.exports = new BancoController();
