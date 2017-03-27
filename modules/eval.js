module.exports = {
  init(bot) {
    const command = `${bot.prefix}eval`;
    const regex = /`(.*?)`/;

    bot.on('message', message => {
      if (message.author.id !== bot.me)
        return;
      if (!message.content.startsWith(command))
        return;

      const _code = message.content.match(regex);
      if (_code && _code[1]) {
        let _output;
        try {
          _output = eval(_code[1]);
        } catch (e) {
          _output = e;
        }

        message.edit([message.content, `\`\`\`${_output}\`\`\``]);
      }
    });
  }
};
