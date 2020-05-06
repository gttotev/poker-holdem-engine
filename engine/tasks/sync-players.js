"use strict";

const task = require("./task");
const getPlayerFactory = require("../../domain/player/create");

const Task = Object.create(task);

Task.name = "Sync players in waiting room";

Task.shouldRun =
  ({ waitingRoom: { joiners, leavers } }) =>
    joiners.length + leavers.size > 0;

Task.run =
  async (LOGGER, tournament) => {
    const players = tournament.gamestate.players;
    const { joiners, leavers } = tournament.waitingRoom;
    const create = getPlayerFactory(LOGGER,
      tournament.onFeed.bind(tournament), tournament.settings);
    tournament.gamestate.players = players.concat(joiners.map(create))
      .filter(p => p && !leavers.has(p.id));
    tournament.waitingRoom.clear();
  };

module.exports = Task;
