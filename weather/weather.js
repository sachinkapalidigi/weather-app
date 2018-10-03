const request = require('request');

var getWeather=(lat,lng,callback)=>{
  request ({
      url:`https://api.darksky.net/forecast/1f5e1fa7377abbcaf8c69ec0b69a6a71/${lat},${lng}
  `,
      json:true
    },(error,response,body)=>{
      if (error) {
        callback('Unable to connect to server');
        //console.log('unable to connect to forecast io server');
      }else if(response.statusCode === 400){
        callback('unable to get weather');
        //console.log('unable to fetch weather');
      }else if (response.statusCode === 200) {
        callback(undefined,{
          Temperature:body.currently.temperature,
          apparentTemperature:body.currently.apparentTemperature
        });
        //console.log(body.currently.temperature);
      }
  });
};

module.exports.getWeather = getWeather;
