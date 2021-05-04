const { sequelize } = require("../database/models");
const Cliente = require("../database/models/init-models")(sequelize).Cliente;

class ClienteController {
  async createCliente(req, res) {
    const ClienteData = req.body;
    const transaction = await sequelize.transaction();
    try {
      const ClienteCreated = await Cliente.create(
        {
          Nome: ClienteData.Nome,
          CPF: ClienteData.CPF,
          Sexo: ClienteData.Sexo,
          Salario: ClienteData.Salario,
          Contato: ClienteData.Contato,
        },
        { transaction }
      );

      await transaction.commit();

      res.status(201).send({ status: true, ClienteCreated });
    } catch (error) {
      await transaction.rollback();

      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }

  async getAllClientes(req, res) {
    try {
      const result = await Cliente.findAll();

      if (result.length > 0) {
        res.status(200).json({ status: true, result });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Nenhum Cliente foi encontrado" });
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
      const result = await Cliente.findByPk(id);
      if (result != null) {
        const Cliente = result.dataValues;

        res.status(200).json({ status: true, Cliente });
      } else {
        res.status(404).json({
          status: false,
          message: `Nenhum Cliente foi encontrado com o id: ${id}`,
        });
      }
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  }

  async updateCliente(req, res) {
    const { id } = req.params;
    const { Nome, CPF, Sexo, Salario, Contato } = req.body;

    try {
      let Cliente = await Cliente.findByPk(id);
      if (Cliente !== null) {
        const transaction = await sequelize.transaction();

        Cliente.Nome = Nome == null ? Cliente.Nome : Nome;
        Cliente.CPF = CPF == null ? Cliente.CPF : CPF;
        Cliente.Sexo = Sexo == null ? Cliente.Sexo : Sexo;
        Cliente.Salario = Salario == null ? Cliente.Salario : Salario;
        Cliente.Contato = Contato == null ? Cliente.Contato : Contato;

        const ClienteUpdated = await Cliente.save({ transaction });

        await transaction.commit();

        res.status(200).json({ status: true, ClienteUpdated });
      } else {
        res.status(400).json({
          status: false,
          message: `Nenhum cliente foi encontrado com o id: ${id}`,
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

  async deleteCliente(req, res) {
    const { id } = req.params;

    try {
      const Cliente = await Cliente.findByPk(id);

      if (Cliente !== null) {
        const transaction = await sequelize.transaction();

        await Cliente.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ status: true, message: "Cliente deletado" });
      } else {
        await transaction.rollback();

        res.status(404).json({
          status: false,
          message: `Nenhum cliente foi encontrado com o id: ${id}`,
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

module.exports = new ClienteController();
