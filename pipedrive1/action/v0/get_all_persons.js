module.exports = {

  name: "get_all_persons",

  title: "Get All Persons",

  description: "",
  version: "v0",

  input:{
    title: "Get All Persons",
    type: "object",
    properties: {

    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{},

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    //input.id = parseData(input.id, output, "User Id");

    const request = require('request');
    let url = "https://karma2.pipedrive.com/api/v1/persons";
    let access_token = "97049486b4716ea06182578a7677aa81393d15de";

    var options = {
      "method" : "GET",
      "url" : url + '?api_token=' + access_token,
      "headers" : {
        "Accept" : "application/json",
        "Content-Type" : "application/json",
        //"authorization" : access_token,
      }
    }

    request(options, function (error, response, body) {

      console.error('error:', error); // Print the error if one occurred

      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      //console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.

      output(null, JSON.parse(body));
    });
    
  }

}

