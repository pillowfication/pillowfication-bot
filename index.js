const Discord = require('discord.js');
const Constants = require('discord.js/src/util/Constants');
const config = require('./config.json');

const me = new Discord.Client();
me.prefix = '~/';
me.id = '144761456645242880';

[
  require('./modules/eval')
]
.forEach(mod => mod.init(me));

me.on('ready', () => {
  console.log('userbot online');
});

me.loginEmailPassword = function(email, password) {
  return new Promise((resolve, reject) => {
    this.rest.client.email = email;
    this.rest.client.password = password;
    this.rest.makeRequest('post', Constants.Endpoints.login, false, {email, password})
      .then(data => {
        this.rest.client.manager.connectToWebSocket(data.token, resolve, reject);
      })
      .catch(reject);
  });
};

me.loginEmailPassword(config.email, config.password);
