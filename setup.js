const prompt = require('prompt');
const jsonfile = require('jsonfile');

const FILE_LOCATION = 'config.json';

let currSettings;
try {
  currSettings = jsonfile.readFileSync(FILE_LOCATION);
} catch (err) {
  currSettings = {};
}

const schema = [{
  name: 'email',
  description: 'Email Address',
  default: currSettings.email,
  required: true
}, {
  name: 'password',
  description: 'Password',
  default: currSettings.password,
  required: true
}];

prompt.start();

prompt.get(schema, (error, result) => {
  try {
    jsonfile.writeFileSync(FILE_LOCATION, result, {spaces: 2});
    console.log(`Config created at '${FILE_LOCATION}'`);
  } catch (error) {
    console.log(`Error creating '${FILE_LOCATION}'. Please try again.`);
    console.log(error);
  }
});
