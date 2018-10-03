const request = require('request');

var geocodeAddress = (address,callback)=>{
  var encodedAddress = encodeURIComponent(address);
  //console.log(encodedAddress);
  //encode uri component - decode uri component -special chars
  request ({
      url:`https://maps.google.com/maps/api/geocode/json?key=AIzaSyA4c295I1O39ojSvo_aRWvjBOmWB4_KXkw&address=${encodedAddress}`,
      json:true
    },(error,response,body)=>{
      if (error) {
        callback("Unable to connect to server");
        //console.log("Coulnot connect to the server");
      } else if (body.status === 'ZERO_RESULTS') {
        callback("Unable to find addrsss");
        //console.log('Unable to find that address');
      }else if (body.status === 'OK') {
        callback(undefined,{
          Address:body.results[0].formatted_address,
          Lattitude:body.results[0].geometry.location.lat,
          Longitude:body.results[0].geometry.location.lng
        });
      }

  });

}

module.exports = {
  geocodeAddress
}
