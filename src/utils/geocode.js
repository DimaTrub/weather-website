const request = require("request")


const geocode = (address, callback) =>{
    const encode = encodeURIComponent(address)
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encode + ".json?access_token=pk.eyJ1IjoiZGltYXRydWI5MCIsImEiOiJjazJ6dnJseXMwbGFhM2JrdDYzaTBqNWtsIn0.0bV6VG8REndNbPzq5QGTew&limit=1"
    request({url: url, json: true},(error,{body}) => {
        if(error){
            callback("Unable to connect to the wheather service",undefined)
        } else if(body.features.length === 0){
            callback("unable to find location try another search",undefined)
        } else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude  : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    
    })
}

module.exports = geocode