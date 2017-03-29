const mathjax = require('mathjax-node');
const svg2png = require('svg2png');

const EX = 12;

mathjax.config({displayErrors: true});

module.exports = {
  init(me) {
    const regex = new RegExp(`^${me.prefix}math\\s+\`(.*)\``);

    me.on('message', message => {
      if (message.author.id !== me.id)
        return;
      const math = message.content.match(regex);
      if (!math || !math[1])
        return;

      mathjax.typeset({
        math: math[1],
        ex: EX,
        svg: true
      }, data => {
        svg2png(data.svg, {
          width: parseFloat(data.width) * EX || 10,
          height: parseFloat(data.height) * EX || 10
        }).then(buffer => {
          return message.channel.sendFile(buffer);
        }).catch(console.log.bind(console));
      });
    });
  }
};
