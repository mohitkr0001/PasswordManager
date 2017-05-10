console.log("Started");

var storage=require('node-persist');
storage.initSync();


function createAccount(accounts){
	var account=storage.getItemSync('account');
	if(typeof account==='undefined')
	{
		account=[];
	}
	account.push(accounts);
	storage.setItemSync('account',account);

		return account;
}

function getAccount(accountName){
	var account=storage.getItemSync('account');
	var holdItem;
	account.forEach(function(account){
		if(account.name===accountName){
			holdItem=account;
		}
		});
	return holdItem;

}

//createAccount({
	//name:'facebook',
	//link:'url'
//});
console.log(getAccount('facebook'));