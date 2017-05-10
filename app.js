console.log("Started");

var storage=require('node-persist');
storage.initSync();

/*
storage.setItemSync('Account',[{
	name:'Mohit',
	balance:678
}]);
*/


var output=storage.getItemSync('Account');
/*
output.push({
	name:'sumit',
	balance:0});
storage.setItemSync('Account',output);
*/

console.log('Show me the account', output);

