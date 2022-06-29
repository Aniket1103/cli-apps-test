// Add your function in module.exports
const request = require('request');
let baseUrl = "https://karma2.pipedrive.com/api/v1/organizations";
let access_token = "97049486b4716ea06182578a7677aa81393d15de";
module.exports = {

  "name":"org_id",

  "label":"Org Id",
	// add input data lookup will depend on for
	// eg: if auth is oauth so add access_token inside auth object
	// you can also add other input properties which are mentioned in action/trigger
	"mock_input": {
		"auth": { }
	},
	"search": true,
  "execute": function (input, options, output){
  	// to access auth info use input.auth , eg: input.auth.username
  	// and to return output use output callback like this output(null, [{ id : "item_id", value : "Item Title"}])
  	// output should be an array of objects containing id and value keys.
    // your code goes here
	let flag = false;
	var options = {
		"method" : "GET",
		"url" : baseUrl + '?api_token=' + access_token,
		"qs" : {
			"limit" : 10,
			"start" : input.page * 10
		},
		"headers" : {
		  //"Accept" : "application/json",
		  "Content-Type" : "application/json",
		  //"authorization" : access_token,
		}
	  }
  
	  request(options, function (error, response, body) {
  
		console.error('error:', error); // Print the error if one occurred
  
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		body = JSON.parse(body);
		let data = body.data;
		//body = JSON.parse(body);
		//console.log(JSON.parse(body));
		let arr = [];
		data.forEach(element => {
			arr.push({
				id : String(element.id),
				value : element.name
			})
		});

		let nextPageFlag = (body && body.additional_data && body.additional_data.pagination && body.additional_data.pagination.more_items_in_collection) ? true : false;
			if (flag)
				nextPageFlag = false
			// let data = {
			// 	"results": filterData(body),
			// 	"next_page": nextPageFlag
			// };

		output(null, {
			"results" : arr,
			"next_page" : nextPageFlag
		});
	  });
	  
    // output(null, [
    // 	{
    // 		id : "item_1",
    // 		value : "Item 1"
    // 	},
    // 	{
    // 		id : "item_2",
    // 		value : "Item 2"
    // 	}
    // ]);
  }

}

module.exports.execute({}, {}, (err, data) => {
	if(err) {
		console.error("error: ", err)
	}
	console.log("data -->>", data);
})