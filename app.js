console.log("Started");
let crypto=require('crypto-js');

var storage=require('node-persist');
storage.initSync();

//initialize yargs
let argv=require('yargs')
.command('create','Enter you Details',function(yargs){
	yargs.option({
		name:{
			demand:true,
			type:'string',
			alias:'n',
			description:'Enter social media name'
		},
		username:{
			demand:true,
			type:'string',
			alias:'u',
			description:'Enter your Username'
		},
		password:{
			demand:true,
			type:'string',
			alias:'p',
			description:'Put you secret password here'
		},
		masterpassword:{
			demand:true,
			type:'string',
			alias:'m',
			description:'Enter the master password'
		}
	}).help('help');
})
.command('get','Show your result',function(yargs){
		yargs.option({
		name:{
			demand:true,
			type:'string',
			alias:'n',
			description:'Enter social media name'
		},
		masterpassword:{
			demand:true,
			type:'string',
			alias:'m',
			description:'Enter the master password'
		}
	}).help('help');
})
.help('help')
.argv;


let command=argv._[0];

function getAccounts(masterpassword){

	let encryptedData=storage.getItemSync('account');
	let account=[];

	if(typeof encryptedData !== 'undefined'){
	let bytes=crypto.AES.decrypt(encryptedData,masterpassword);
	account=JSON.parse(bytes.toString(crypto.enc.Utf8));
	}

	return account;
}



function saveAccount(account,masterpassword){

	let enaccount=crypto.AES.encrypt(JSON.stringify(account),masterpassword);	
	storage.setItemSync('account',enaccount);

	return account;
}


function createAccount(account,masterpassword){
	let accounts=getAccounts(masterpassword);
	accounts.push(account);
	saveAccount(accounts,masterpassword);

		return account;
}

function getAccount(accountName,masterpassword){
	let account=getAccounts(masterpassword);
	var holdItem;
	account.forEach(function(account){
		if(account.name===accountName){
			holdItem=account;
		}
		});
	return holdItem;

}

if(command==='create'){
	let store=createAccount({
		name:argv.name,
		username:argv.username,
		password:argv.password
	},argv.masterpassword);

console.log('Account Created');
console.log(store);
}
else if(command==='get'){
	let show=getAccount(argv.name,agrv.masterpassword);

	if(typeof show==='undefined'){
		console.log('Sorry but your account is not found');
	}
	else
		{console.log('Accound found');
		console.log(show);
		}
}