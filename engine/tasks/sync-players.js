"use strict";

const task = require("./task");
const getPlayerFactory = require("../../domain/player/create");

const Task = Object.create(task);

Task.name = "Sync players in waiting room";

Task.shouldRun =
  ({ waitingRoom: { order } }) =>
    order.length > 0;

Task.run =
  async (LOGGER, tournament) => {
    const players = tournament.gamestate.players;
    const { order, joiners } = tournament.waitingRoom;
    const create = getPlayerFactory(LOGGER,
      tournament.onFeed.bind(tournament), tournament.settings);
    const currentPlayers = new Map();
    players.forEach(p => currentPlayers.set(p.id, p));
    tournament.gamestate.players = order.filter(Boolean).map(id =>
      currentPlayers.get(id) || create(joiners.get(id)));
    tournament.waitingRoom.clear();
  };

module.exports = Task;
