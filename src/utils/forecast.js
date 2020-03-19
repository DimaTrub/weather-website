
const request = require("request")

const forecast = (latitude,longitude,callback) => {

    const url = 'https://api.darksky.net/forecast/69b761c4ad221bfffbf1aba2d52083b7/' + latitude + ','+ longitude +'?units=si'
    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the wheather service',undefined)
            
        } else if(body.error){
            callback('unable to find location',undefined)
            
        } else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                rainProp: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast