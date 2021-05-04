const router = require("express").Router();
const AgenciaController = require("./controller/AgenciaController");
const BancoController = require("./controller/BancoController");
const ClienteController = require("./controller/ClienteController");

//Agencia rotas
router.post("/createAgencia", AgenciaController.createAgencia);
router.get("/getallagencias", AgenciaController.getAllAgencias);
router.get("/getagencia/:id", AgenciaController.getById);
router.put("/updateagencia/:id", AgenciaController.updateAgencia);
router.delete("/deleteangecia/:id", AgenciaController.deleteAgencia);

//Banco rotas
router.post("/createbanco", BancoController.createBanco);
router.get("/getallbancos", BancoController.getAllBancos);
router.get("/getbanco/:id", BancoController.getById);
router.put("/updatebanco/:id", BancoController.updateBanco);
router.delete("/deletebanco/:id", BancoController.deleteBanco);

//Cliente rotas
router.post("/createcliente", ClienteController.createCliente);
router.get("/getallclientes", ClienteController.getAllClientes);
router.get("/getcliente/:id", ClienteController.getById);
router.put("/updatecliente/:id", ClienteController.updateCliente);
router.delete("/deletecliente/:id", ClienteController.deleteCliente);

module.exports = router;
