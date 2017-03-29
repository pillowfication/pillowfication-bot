module.exports = {
  init(me) {
    me.on('message', message => {
      if (message.author.id !== me.id)
        return;

      if (message.content === `${me.prefix}ping`) {
        message.edit(`${message.content} pong`)
          .then(message => {
            const ping = message.editedTimestamp - message.createdTimestamp;
            return message.edit(`${message.content} ${ping}ms`);
          })
          .catch(console.log.bind(console));
      }
    });
  }
};
