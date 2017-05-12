let argv=require('yargs')
.command('hello','Greet user',function(yargs){
	yargs.options({
		name:{
			demand:true,
			alias:'n',
			description:'Your name goes here'
		}
	}).help('help');
})
.help('help')
.argv;
let arr=argv._[0];
console.log(argv);

if(typeof arr==='string' && typeof argv.name!=='undefined'&& typeof argv.lastname!=='undefined'){
	console.log('Hey '+argv.name+' '+argv.lastname+'!');
}