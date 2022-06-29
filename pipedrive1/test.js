const request = require('request');
let baseUrl = "https://karma2.pipedrive.com/api/v1/organizations";
let access_token = "97049486b4716ea06182578a7677aa81393d15de";

var options = {
  "method" : "GET",
  "url" : baseUrl + '?api_token=' + access_token,
  "headers" : {
    //"Accept" : "application/json",
    "Content-Type" : "application/json",
    //"authorization" : access_token,
  }
  }

  request(options, function (error, response, body) {

  console.error('error:', error); // Print the error if one occurred

  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  //console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
  console.log(JSON.parse(body));
  //output(null, JSON.parse(body));
  });
  
  // output(null, [
  //   {
  //     id : "item_1",
  //     value : "Item 1"
  //   },
  //   {
  //     id : "item_2",
  //     value : "Item 2"
  //   }
  // ]);


console.log();