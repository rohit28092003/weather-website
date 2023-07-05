
const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){ 
     res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "bbbd4d357f96e10e9aefa804e0a33740";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            // console.log(weatherData);

            const temp = weatherData.main.temp;
            // console.log(temp);
            const description = weatherData.weather[0].description;
            // console.log(description);

        //     const object = {
        //         name:"Rohit",
        //         favfood:"Aaloo ki sabji op✨"
        //     }
        //     console.log(JSON.stringify(object));
         
        const weatherImage = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      
        res.write("<p>The weather is "+ description +".</p>");
        res.write("<h1>The temperature in "+ query +" is " + temp + " degree celsius.</h1>");
        res.write("<img src="+weatherImage+">");
        res.send();
        });
    });
});


  //there is only 1 send possible. 


app.listen(3000,function(){
    console.log("server is working on 3000");
});