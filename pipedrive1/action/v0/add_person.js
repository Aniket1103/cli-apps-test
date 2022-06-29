module.exports = {

  name: "add_person",

  title: "Add Person",

  description: "",
  version: "v0",

  input:{
    title: "Add Person",
    type: "object",
    properties: {
      "name" : {
        "title" : "Person Name",
        "type" : "string",
        "minLength" : 1,
        "description" : "Enter the name for the new person"
      },
      "ownerId" : {
        "title" : "Owner ID",
        "type" : "string"
      },
      "org_id" : {
        "title" : "Organisation ID",
        "type" : "string"
      },
      "email" : {
        "title" : "Email",
        "type" : "string"
      }
    }
  },

  output: {
    title: "output",
  	type: "object",
  	properties: {

    }
  },

  mock_input:{
    "name" : "Test"
  },

  execute: function(input, output){
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, { 'notice' : 'successful'})
    // your code here
    const request = require('request');
    let url = "https://karma2.pipedrive.com/api/v1/persons";
    let access_token = "97049486b4716ea06182578a7677aa81393d15de";

    var options = {
      "method" : "POST",
      "url" : url + '?api_token=' + access_token,
      "headers" : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      "json" : {
        name : input.name,
        email : input.email,
        owner_id : input.ownerId,
        org_id : input.org_id
      }
    }

    request(options, function (error, response, body) {

      console.error('error:', error); // Print the error if one occurred
      console.log(typeof body);
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      console.log('body:', body.data); // Print the HTML for the Google homepage.

      output(null, body.data);
    });

    //output(null, { data : "OK"});
  }

}
