console.log("Started");

var storage=require('node-persist');
storage.initSync();

storage.setItemSync('name','Mohit');
var output=storage.getItemSync('name');
console.log('Name will be'+output);