const Discord = require('discord.js');
const Constants = require('discord.js/src/util/Constants');
const config = require('./config.json');

const bot = new Discord.Client();
bot.prefix = '~/';
bot.me = '144761456645242880';

[
  require('./modules/eval')
]
.forEach(mod => mod.init(bot));

bot.on('ready', () => {
  console.log('user-bot online');
});

bot.loginEmailPassword = function(email, password) {
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

bot.loginEmailPassword(config.email, config.password);
