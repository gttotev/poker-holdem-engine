# Api

## Tournament

```js
const Tournament = require("poker-holdem-engine");
```

It's a constructor.

It extends node.js `EventEmitter`.

Creates a new tournament.

**Arguments**

  1. `tournamentId` (String):

  2. `players` (Player[]):
  
  3. `tournamentSettings` (Settings)

  4. `opts` (Object)

    - `opts.autoStart` (Boolean)

    - `opts.recoveryId` (Number?)

**Returns**

A new tournament.

## Player

A JavaScript object with at least the `name`, `id`, and (`serviceUrl`, or `getBet`) properties specified,
where `serviceUrl` is a string representing an HTTP endpoint and `getBet` is a function with one parameter
returning a number or a Promise of a number.

* If `serviceUrl` is given, will send HTTP POST request to it and use response as bet.
* If `getBet` is given and `serviceUrl` is **not** given, will use `getBet(payload)` as bet.
