module.exports = {
  init(me) {
    me.on('message', message => {
      if (message.author.id !== me.id)
        return;

      if (message.content === `${me.prefix}exit`)
        process.exit(0);
    });
  }
};
