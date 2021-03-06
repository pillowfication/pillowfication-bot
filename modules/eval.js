const util = require('util');
const winston = require('winston');

module.exports = {
  init(me) {
    // '_'-prefix variables to prevent accidental `eval` abuse
    const _regex = new RegExp(`^${me.prefix}eval\\s+\`\`\`(.*)\`\`\``);

    me.on('message', message => {
      if (message.author.id !== me.id)
        return;
      const _code = message.content.match(_regex);
      if (!_code || !_code[1])
        return;

      let _output;
      try {
        _output = eval(_code[1]);
      } catch (e) {
        _output = e;
      }

      message
        .edit(
          `${me.prefix}eval` +
          `\`\`\`js\n${_code[1]}\n\`\`\`` + // Don't put a '\n' here please
          `\`\`\`js\n${util.inspect(_output)}\n\`\`\``
        )
        .catch(err => {
          winston.error('Could not edit message', err);
          message.edit(
            `${message.content}\n` +
            `\`\`\`${err.message}\`\`\``
          );
        });
    });
  }
};
