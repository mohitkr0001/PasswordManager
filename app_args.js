let argv=require('yargs').argv;
let arr=argv._[0];
console.log(argv);

if(typeof arr==='string' && typeof argv.name!=='undefined'&& argv.lastname!=='undefined'){
	console.log('Hey '+argv.name+' '+argv.lastname+'!');
}