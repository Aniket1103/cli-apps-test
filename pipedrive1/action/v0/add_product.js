module.exports = {

  name: "add_product",

  title: "Add Product",

  description: "",
  version: "v0",

  input:{
    title: "Add Product",
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

    output(null, { data : "OK"});
  }

}
