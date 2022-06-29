const request = require('request');
let baseUrl = "https://karma2.pipedrive.com/api/v1/webhooks";
let access_token = "97049486b4716ea06182578a7677aa81393d15de";
module.exports = {

  name: "add_person",

  label: "Add Person",

  version: "v1",

  input: {
    type: "object",
    title: "Add Person",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["add_person"]
      },
      polling: {
        type: "boolean",
        default: false,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "add_person": {
      type: "object",
      properties: {

      }
    }
  },

  mock_data: {}, // output of trigger data

  mock_input: {},

  execute: function (input, payload, output) {
    // will be invoked when the event is triggered
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : 'key', value : 'My Val'}])
    // output should be an array of objects or an empty array.

    // your code goes here
    //console.log(input.webhook);
    // payload = Object.assign({
    //   event_type: "Person added"
    // }, payload)
    console.log(payload);
    output(null, payload);
    //output(null, []);

  },

  register: function (input, output) {
    // function will be used for registering webhook with services additional key
    // 'webhook' along with input data will be available here so you can access the input.webhook
    // for registering the webhook

    // request({
    //   "method" : "POST",
    //   "url" : baseUrl + '?api_token=' + access_token,
    //   "headers" : {
    //     "Accept" : "application/json",
    //     "Content-Type" : "application/json"
    //   },
    //   json:{
    //     "input" : input
    //   }
    // }, function (error, response, body) {

    // })

    var options = {
      "method" : "POST",
      "url" : baseUrl + '?api_token=' + access_token,
      "headers" : {
        "Accept" : "application/json",
        "Content-Type" : "application/json"
      },
      json:{
        "subscription_url" : input.webhook,
        "event_action":"added",
        "event_object":"person"
      }
      // "json" : {
      //   "webhook": {
      //     "name": "Created by Aniket " + new Date(Date.now()).toLocaleDateString(),
      //     // channels: channels,
      //     "destinations": [{
      //       "target_url": input.webhook
      //     }],
      //     "retry_policy": "manual"
      //   }
      // }
    }
  return request(options, function (error, response, body) {
    console.log("error is here -->>",error)

      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      console.log('body:', body.data); // Print the HTML for the Google homepage.

      return output(null, body.data);
    });
    //output("failed");
  },

  unregister: function (input, options, output) {
    // will be invoked when user deletes the trigger for unregistering the webhook
    // webhook id will be available in input.webhookId

    // your code goes here
    var options = {
      "method" : "DELETE",
      "url" : baseUrl + '/' + input.webhookId + '?api_token=' + access_token,
      "headers" : {
        "Content-Type" : "application/json"
      },
      json:{
        "id" : input.webhookId,
      }
      
    }
  return request(options, function (err, res, body) {
    if (err) {
      return output(err);
    }
    if (res && res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
      return output(null, {
        "message": "Webhook deleted successfully!!"
      });
    }
    output(body);
  });

    //return output(null, true);
  },

  activate: function(input, options, output)
 {
   // This function will be called whenever user activates the trigger/workflow. 
  // This function is useful in scenarios where you save cursor to figure out newly added/changed data in the
  // 3rd party services. You can update your cursor so that trigger won't fetch data of the period 
  // during which the trigger was deactivated.
 }

}


// let input = {
// webhook : "https://webhook.site/218344b6-769d-4da6-bed5-68a3dc6636a9"
// }

// let data;
// module.exports.register(input, (err, res) => {

//   if (err) {
//     console.log("err is here -->>", err)
//   } 
//   console.log("res is here -->>", JSON.stringify(res))
//   //data = JSON.parse(res);

// })


// module.exports.execute(input, {output : "data"}, (err, res) => {
//   if(err) {
//     console.log(err);
//   }
//   console.log(JSON.stringify(res))
// })

// module.exports.unregister(input,{}, (err, res) => {

//   if (err) {
//     console.log("err is here -->>", err)
//   } 
//   console.log("res is here -->>", JSON.stringify(res))
//   //data = JSON.parse(res);

// })