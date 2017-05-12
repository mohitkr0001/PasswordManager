console.log("Started");

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
		}
	}).help('help');
})
.argv;


let command=argv._[0];


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

if(command==='create'){
	let store=createAccount({
		name:argv.name,
		username:argv.username,
		password:argv.password
	});

console.log('Account Created');
console.log(store);
}
else if(command==='get'){
	let show=getAccount(argv.name);

	if(typeof show==='undefined'){
		console.log('Sorry but your account is not found');
	}
	else
		{console.log('Accound found');
		console.log(show);
		}
}