const { DiscordBattleShip } = require("discord-battleship");
const BattleShip = new DiscordBattleShip({prefix: "-"})
exports.BattleShip = BattleShip
//
const { EconomyManager } = require("quick.eco")
const eco = new EconomyManager({
    noNegative: true,
    adapter: 'mongo',
    adapterOptions: {
        collection: 'money', // => Collection Name
        uri: 'mongodb+srv://Lilly-dev:V0TFU0jowTxpIvyd@lillybot.43rtj.mongodb.net/Lilly-dev' // => Mongodb uri
    }
});
//
exports.eco = eco
//
const Minesweeper = require('discord.js-minesweeper');

const minesweeper = new Minesweeper();
minesweeper.start();
exports.Minesweeper = Minesweeper
//
const SnakeGame = require('snakecord');
const snakeGame = new SnakeGame({
    title: 'Snake Game',
    color: "GREEN",
    timestamp: false,
    gameOverTitle: "Game Over"
});
exports.snakeGame = snakeGame

