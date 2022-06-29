const request = require('request');
let baseUrl = "https://api.dropboxapi.com/2/files/list_folder";
let access_token = "Bearer sl.BKfwG_PooMRSA5fFyG-jspRi0RN9SgLWOOCl2qR-qu_RgLI2Fc-4kj7fZp-ZL8P7_MoZ9pcTYPTDCayYJ0CHvGy8lZTBP-Sy0kmMmu_ODrdgWk6WZLEMn0tR54bTvjCnAoN6_iFiizlW";

module.exports = {
    filesListFolder : function (input){
        return new Promise((resolve, reject) =>{
            request({
                "method" : "POST",
                "url" : baseUrl,
                "headers" : {
                    "Authorization" : access_token,
                    "Content-Type" : "application/json"
                },
                "json" : input
            }, (err, res) => {
                if(err){
                    console.error("error-->>",err);
                    reject(err);
                }
                //console.log("Output-->>", res.body);
                resolve(res);
            })
        })
    }
}