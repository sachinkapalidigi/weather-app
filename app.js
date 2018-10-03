const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a:{
      demand:true,
      alias:'address',
      describe:'Address to fetch weather for',
      string:true
    }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.a, (errorMessage,results)=>{
  if (errorMessage) {
    console.log(errorMessage);
  } else{
    console.log(results.Address);
    weather.getWeather(results.Lattitude,results.Longitude,(errorMessage,weatherResults)=>{
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.Temperature} but it feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
