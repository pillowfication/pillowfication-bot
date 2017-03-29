module.exports = {
  init(me) {
    me.on('message', message => {
      if (message.author.id !== me.id)
        return;
      if (message.content !== `${me.prefix}ping`)
        return;

      message.edit(`${message.content} pong`)
        .then(message =>
          message.edit(`${message.content} ${message.editedTimestamp - message.createdTimestamp}ms`)
        )
        .catch(err => {
          console.log(err);
          message.edit(
            `${message.content}\n` +
            `\`\`\`${err.message}\`\`\``
          );
        });
    });
  }
};
