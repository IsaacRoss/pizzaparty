var fs = require('fs'),
    options = {encoding: 'utf8', flag: 'r'},
    configurations = {};

fs.readFile('pizzas.json', options, function(err, data){
    if(err){
        console.log("Failed to open pizzas file.");
    }else{
       data = JSON.parse(data);
       configurations = buildConfigurations(data);
       outputConfigurations(configurations);
    }
});


function buildConfigurations(data){
	data.forEach(function(x){
	       	var toppingsKey = x.toppings.sort().join('-');
	       	if(configurations[toppingsKey]){
	       		configurations[toppingsKey] += 1;
	       	}else{
	       		configurations[toppingsKey] = 1
	       	}
       });
	return configurations;
}

function outputConfigurations(configurations){
	var conf, 
		sortable = [];

	for (conf in configurations){
		sortable.push([conf, configurations[conf]]);
	}
	
	sortable.sort(function(a, b){
		return b[1] - a[1];
	})
	.slice(0, 20)
	.forEach(function(item){
		console.log(item[0].split('-').join(' & '), ':', item[1], 'orders')
	});
}