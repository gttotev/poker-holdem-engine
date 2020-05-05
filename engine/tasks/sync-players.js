"use strict";

const task = require("./task");
const getPlayerFactory = require("../../domain/player/create");

const Task = Object.create(task);

Task.name = "Add or remove players in waiting room";

Task.shouldRun =
  ({ waitingRoom }) =>
    waitingRoom.length > 0;

Task.run =
  async (LOGGER, tournament) => {
    const players = tournament.gamestate.players;
    tournament.waitingRoom.forEach(({active, data}) => {
      if (active) {
        const create = getPlayerFactory(LOGGER,
          tournament.onFeed.bind(tournament), tournament.settings);
        const p = create(data);
        if (p) tournament.gamestate.players = players.concat(p);
      } else {
        tournament.gamestate.players = players.filter(p => p.id !== data);
      }
    });
    tournament.waitingRoom = [];
  };

module.exports = Task;
