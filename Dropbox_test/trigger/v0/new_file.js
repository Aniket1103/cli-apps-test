// var Dropbox = require('dropbox').Dropbox;
// var dbx = new Dropbox({ accessToken: 'sl.BKWzG78W2j00tBrzBuHCS3SNMJwEOlsViUhmifUK1UwSEyC_dQ36Bp-tjGjVF78UWCn_YhEhBnNKP4DQFuPQA7E_RoSQk1HVaHmROdqYY6VmZSTIQjMGxG_Sv0zxq23R4YFMzUX79X_E' });
const dbx = require("../../common");

module.exports = {

  name: "new_file",

  label: "New File",

  version: "v0",

  input: {
    type: "object",
    title: "New File",
    description: "Short description",
    properties: {
      event: {
        type: "string",
        enum: ["new_file"],
        isExecute: true
      },
      polling: {
        type: "boolean",
        default: true,
        options: {
          hidden: true
        }
      }
    }
  },

  output: {
    "new_file": {
      type: "object",
      properties: {
        "event_type": {
          "title": "event_type",
          "type": "string",
          "displayTitle": "Event Type"
        },
        "tag": {
          "title": "tag",
          "type": "string",
          "displayTitle": "Tag"
        },
        "name": {
          "title": "name",
          "type": "string",
          "displayTitle": "Name"
        },
        "path": {
          "title": "path",
          "type": "string",
          "displayTitle": "Path"
        },
        "path_display": {
          "title": "path_display",
          "type": "string",
          "displayTitle": "Path Display"
        },
        "file_url": {
          "title": "file_url",
          "type": "string",
          "displayTitle": "File Url"
        },
        "id": {
          "title": "id",
          "type": "string",
          "displayTitle": "ID"
        },
      }
    }
  },

  mock_data: {
  }, // output of trigger data

  mock_input: {},

  getUserData: function (input, options, output) {
    // will be called when testing trigger before it is created
    // return the actual data from your service which will be used for
    // creating output schema and it should be flat output json
    return output(null, []);
  },

  execute: function (input, options, output) {
    // will be called every 5 minutes
    // to access auth info use input.auth , eg: input.auth.username
    // and to return output use output callback like this output(null, [{ mykey : "key", value : "My Val"}])
    // output should be an array of objects or an empty array.

    // your code here
    // options.setMeta({
    //   oldFilesCount: 4,
    // })
    //options.meta['oldFiles'] = []; 
    //console.log("Options -->>",options);
    dbx.filesListFolder({path: ''})
    .then(function(response) {

      let newList = response.body.entries.filter((item) => {
        if(item['.tag'] === 'file'){
          //options.meta.oldFiles.push(item.id);
          return !options.meta.oldFiles.includes(item.id);
        }
        else if(item['.tag'] === 'folder'){
          //options.meta.oldFolders.push(item.id);
          return !options.meta.oldFolders.includes(item.id);
        }
        return false;
      })
      console.log(newList);

      options.setMeta({
        oldFiles: response.body.entries.filter((item) => {
          return item['.tag'] === "file" ;
        }).map((item) => {
          return item.id;
        }),
        oldFolders: response.body.entries.filter((item) => {
          return item['.tag'] === "folder" ;
        }).map((item) => {
          return item.id;
        }),
      })
      //console.log(response.body);
      //options.meta['oldFiles'] = response.body.entries;
      // options.setMeta({
      //   oldFiles: response.body.entries.filter((item) => {
      //     return item['.tag'] === "file" ;
      //   }).map((item) => {
      //     return item.id;
      //   }),
      //   oldFolders: response.body.entries.filter((item) => {
      //     return item['.tag'] === "folder" ;
      //   }).map((item) => {
      //     return item.id;
      //   }),
      // })
      //console.log("options exe", options);
      return output(null, newList);
    })
    .catch(function(error) {
      console.log(error);
      return output(error);
    });

    
    //output(null, []);

  },

  activate: function (input, options, output) {
    // this function will be called whenever user activate or reactivates flow
    // to access auth info use input.auth , eg: input.auth.username
    // you can use this function to reset your cursor or timestamp

    // your code goes here
    
    this.validate(input, options, output);
    //output(null, true);
  },

  validate: function (input, options, output) {
    // will be called when trigger is created 1st time
    // to access auth info use input.auth , eg: input.auth.username
    // to successfully validate auth info and other parameter provided by user call output(null, true)
    // in case auth or other info is invalid, prevent creating trigger by sending error output("Username or password is invalid")

    // your code goes here
    dbx.filesListFolder({path: ''})
    .then(function(response) {
      console.log(response);
      //options.meta['oldFiles'] = response.body.entries;
      options.setMeta({
        oldFiles: response.body.entries.filter((item) => {
          return item['.tag'] === "file" ;
        }).map((item) => {
          return item.id;
        }),
        oldFolders: response.body.entries.filter((item) => {
          return item['.tag'] === "folder" ;
        }).map((item) => {
          return item.id;
        }),
      })
      console.log("validate options", options);
      //output(null, response.body.entries);
      return output(null, true);
    })
    .catch(function(error) {
      console.log(error);
      return output(null, false);
    });
    
  }
}
