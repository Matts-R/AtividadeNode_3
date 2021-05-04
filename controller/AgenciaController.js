const { sequelize } = require("../database/models");
const Agencia = require("../database/models/init-models")(sequelize).agencia;

class AgenciaController {
  async createAgencia(req, res) {
    const { numero_agencia, descricao, banco_id } = req.body;
    try {
      const transaction = await sequelize.transaction();

      const agenciaCreated = await Agencia.create(
        {
          numero_agencia: numero_agencia,
          descricao: descricao,
          banco_id: banco_id,
        },
        { transaction }
      );

      res.status(200).json({
        status: true,
        Agencia: agenciaCreated,
      });
    } catch (error) {
      transaction.rollback();

      res.status(400).json({
        message:
          "Ops, desculpe mas parece que ocorreu um erro ao criar a Agencia, por favor tente novamente.",
        status: false,
      });
    }
  }

  async getAllAgencias(req, res) {
    try {
      const Agencias = await Agencia.findAll();

      if (Agencias.length < 1) {
        res.status(204).json({
          status: false,
          message: "Desculpe, mas nenhuma Agencia foi encontrado.",
        });
        return;
      }

      res.status(200).json({
        status: true,
        Agencias: Agencias,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        message: "Error",
      });
    }
  }

  async getById(req, res) {
    const AgenciaId = req.params.id;
    try {
      const AgenciaSearched = await Agencia.findByPk(AgenciaId);

      if (AgenciaSearched == null) {
        res.status(204).json({
          status: false,
          message: "Desculpe, mas nenhuma Agencia foi encontrado para este id",
        });
        return;
      }

      res.status(200).json({
        status: true,
        data: AgenciaSearched,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        message: "Desculpe, ocorreu um erro ao encontrar o Agencia.",
        id: AgenciaId,
      });
    }
  }

  async updateAgencia(req, res) {
    const AgenciaId = req.params.id;
    const { numero_agencia, descricao, banco_id } = req.body;

    try {
      const AgenciaUpdated = await Agencia.findByPk(AgenciaId);

      if (AgenciaUpdated == null) {
        res.status(204).json({
          status: false,
          message: "Desculpe, mas nenhuma Agencia foi encontrado para este id",
        });
        return;
      }

      const transaction = await sequelize.transaction();

      AgenciaUpdated.numero_agencia =
        numero_agencia == null ? AgenciaUpdated.numero_agencia : numero_agencia;

      AgenciaUpdated.descricao =
        descricao == null ? AgenciaUpdated.descricao : descricao;

      AgenciaUpdated.banco_id =
        banco_id == null ? AgenciaUpdated.banco_id : banco_id;
      const result = await AgenciaUpdated.save({ transaction });

      transaction.commit();
      res.status(201).json({
        status: true,
        data: result,
      });
    } catch (error) {
      transaction.rollback();
      res.status(404).json({
        status: false,
        message: "Desculpe, ocorreu um erro ao atualizar a Agencia.",
      });
    }
  }

  async deleteAgencia(req, res) {
    const AgenciaId = req.params.id;

    const transaction = await sequelize.transaction();
    try {
      const AgenciaDeleted = await Agencia.findByPk(AgenciaId);

      if (AgenciaDeleted == null) {
        res.status(204).json({
          status: false,
          message:
            "Desculpe, parece que não há nenhuma Agencia para ser deletado",
        });
        return;
      }

      await AgenciaDeleted.destroy({ transaction });

      transaction.commit();
      res.status(200).json({
        status: true,
        message: "Agencia deletada",
      });
    } catch (error) {
      console.log(error);
      transaction.rollback();
      res.status(404).json({
        status: false,
        message: "Desculpe, ocorreu um erro ao tentar deletar a Agencia.",
      });
    }
  }
}

module.exports = new AgenciaController();
