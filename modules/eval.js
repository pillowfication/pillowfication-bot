module.exports = {
  init(me) {
    // '_'-prefix variables to prevent accidental `eval` abuse
    const _regex = new RegExp(`^${me.prefix}eval\\s+\`\`\`(.*)\`\`\``);

    me.on('message', message => {
      if (message.author.id !== me.id)
        return;
      const _code = message.content.match(_regex);
      if (!_code)
        return;

      let _output;
      try {
        _output = eval(_code[1]);
      } catch (e) {
        _output = e;
      }

      message.edit(
        `${me.prefix}eval\n` +
        `\`\`\`js\n${_code[1]}\n\`\`\`\n` +
        `\`\`\`js\n${_output}\n\`\`\``
      );
    });
  }
};
