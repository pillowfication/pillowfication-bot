module.exports = {
  init(me) {
    // '_'-prefix variables to prevent accidental `eval` abuse
    const _command = `${me.prefix}eval`;
    const _regex = /`(.*?)`/;

    me.on('message', message => {
      if (message.author.id !== me.id)
        return;
      if (!message.content.startsWith(_command))
        return;

      const _code = message.content.match(_regex);
      if (_code && _code[1]) {
        let _output;
        try {
          _output = eval(_code[1]);
        } catch (e) {
          _output = e;
        }

        message.edit(`${message.content}\n\`\`\`${_output}\`\`\``);
      }
    });
  }
};
