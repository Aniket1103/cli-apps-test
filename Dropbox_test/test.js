const request = require('request');
let baseUrl = "https://api.dropboxapi.com/2/files/list_folder";
let access_token = "Bearer sl.BKWzG78W2j00tBrzBuHCS3SNMJwEOlsViUhmifUK1UwSEyC_dQ36Bp-tjGjVF78UWCn_YhEhBnNKP4DQFuPQA7E_RoSQk1HVaHmROdqYY6VmZSTIQjMGxG_Sv0zxq23R4YFMzUX79X_E";
//require('drop'); // or another library of choice.
// var Dropbox = require('dropbox').Dropbox;
// var dbx = new Dropbox({ accessToken: 'sl.BKXKXsWnYGkrizOgmoaRwgcLDRUkReYU-X6raJthcRRWQsR6bbqgmlxeYvPxRHW_-K5pVe2grlg2sFC5-z06deBrDh1eEODqBYzwiQxTqbNVJGyOVkruLGEa3mKQxM7C8z3CRkPuK899' });
// dbx.filesListFolder({path: ''})
//   .then(function(response) {
//     console.log(response.result);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

request({
    "method" : "POST",
    "url" : baseUrl,
    "headers" : {
        "Authorization" : access_token,
        "Content-Type" : "application/json"
    },
    "json" : {
        "path": ""
    }
}, (err, res) => {
    if(err){
        console.error("error-->>",err);
    }
    console.log("Output-->>", res.body);
})