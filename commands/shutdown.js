module.exports.config = {
    name: "shutdown",
    group: "owners",
    ownerOnly: true,
    guarded: true,
    usage: `.shutdown`,
    example: `.shutdown`
}

module.exports.run = async(bot, message, args) => {
  if(message.author.id != "783652998319833118") return message.channel.send("You are not my owner. Not today!")

  try {
    await message.channel.send("Bot successfully shuted down... go to the host and start the bot manually.")
    process.exit()
  } catch(err) {
    message.channel.send("ERROR: Cannot shutdown")
  }

}