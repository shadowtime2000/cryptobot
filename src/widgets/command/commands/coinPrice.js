const CommandBuilder = require("../classes/CommandBuilder");

const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

module.exports = new CommandBuilder()
  .setName("coinprice")
  .setAliases(["coin", "price"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(true)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  // eslint-disable-next-line
  .setExecute(async (message, user, args) => {
    let data = await CoinGeckoClient.simple.price({
      ids: [args[0]],
      vs_currencies: [args[1]],
    });
    await message.channel.send(
      `${args[2] || 1} ${args[0]} -> ${
        data.data[args[0]][args[1]] * (args[2] || 1)
      } ${args[1]}`
    );
  });
