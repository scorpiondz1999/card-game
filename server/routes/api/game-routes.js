const router = require("express").Router();
const { startGame, getCards } = require("../../controllers/game-controller");

// import middleware
const { authMiddleware } = require("../../utils/auth");

router.route("/startgame").get(startGame);

router.route("/getcards").get(authMiddleware, getCards);

module.exports = router;
