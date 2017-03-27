const mathjax = require('mathjax-node-svg2png');
const svg2png = require('svg2png');

const dump = '295816771858989056';

mathjax.config({
  displayErrors: false
});

function render(math, cb) {
  mathjax.typeset({
    math: math,
    png: true
  }, data => {
    svg2png(data.svg, {height: 80}).then(cb);
  });
}

module.exports = {
  init(me) {
    const command = `${me.prefix}math`;
    const regex = /`(.*?)`/;

    me.on('message', message => {
      if (message.author.id !== me.id)
        return;
      if (!message.content.startsWith(command))
        return;

      const math = message.content.match(regex);
      if (math && math[1])
        render(math[1], buffer => {
          me.channels.get(dump).sendFile(buffer)
            .then(upload => {
              message.edit(message.content, {
                embed: {
                  image: {url: upload.attachments.first().url}
                }
              })
              .then(() => {
                upload.delete();
              });
            });
        });
    });
  }
};
