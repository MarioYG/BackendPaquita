var express = require('express');
var bodyParser = require("body-parser");
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var jsonwebtoken = require("jsonwebtoken");
var conversation = new ConversationV1({
  "username": "0d2b9871-6921-4224-86d9-afd469d9ef09",
  "password": "1hVVU051ntQG",
  version_date: ConversationV1.VERSION_DATE_2017_05_26
});

var cfenv = require('cfenv');
var User = require("./models/user").User;
var jwt = require('jsonwebtoken');
var Invoice = require("./models/invoice").Invoice;
var Metas = require("./models/metas").Metas;
var app = express();
var request = require('request');
var http = require('http');
const sortBy = require('sort-array');
app.use(express.multipart());//debemos añadir esto para subir archivos
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
var unique = require('array-unique');
var appEnv = cfenv.getAppEnv();
var AdmZip = require('adm-zip');
app.set('view engine', 'jade');
var cors = require('cors');

app.use(cors());

app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});



app.post("/users",function(req,res){
	var xml = '<soapenv:Envelope xmlns:ser="http://service.sunat.gob.pe" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">     <soapenv:Header> <wsse:Security> <wsse:UsernameToken> <wsse:Username>'+req.body.ruc+req.body.username+'</wsse:Username> <wsse:Password>'+req.body.password+'</wsse:Password> </wsse:UsernameToken>  </wsse:Security> </soapenv:Header>  <soapenv:Body> <ser:getStatus> <rucComprobante>1028308796</rucComprobante> <tipoComprobante>01</tipoComprobante>  <serieComprobante>f213</serieComprobante> <numeroComprobante>12345</numeroComprobante> </ser:getStatus> </soapenv:Body> </soapenv:Envelope>';
	request.post(
	    {url:'https://www.sunat.gob.pe/ol-it-wsconscpegem/billConsultService',
	    body : xml,
	    headers: {'Content-Type': 'text/xml'}
    },
    function (error, response, body) {        
        //if (!error && response.statusCode == 200) {
        var fs = require('fs'),
	    xml2js = require('xml2js');
		var parser = new xml2js.Parser();
		parser.parseString(body, function (err, result) {
			if ( typeof result['S:Envelope']['S:Body'][0]['ns0:getStatusResponse']!== 'undefined' && result['S:Envelope']['S:Body'][0]['ns0:getStatusResponse'] )
			{

				var user = new User({email: req.body.email,
					password: req.body.password,
					username: req.body.username,
					ruc: req.body.ruc,
					password_confirmation: req.body.password_confirmation,
					name: req.body.name
					});
				user.save().then(function(us){
					er = {
						mensaje: "Recibimos tus datos "+ req.body.username,
						codigo: 1
					}
					res.send(er);
				},function(err){
					er = {
						mensaje: "Datos Incorrectos",
						codigo: 2
					}
					res.send(er); 
				});
			}
			else
			{

				message = {
						codigo : 1,
						Mensaje : "Datos Incorrectos"
				};
				res.send(message);

			}
		});
    });
    /*
	*/
});
app.post("/watson",function(req,res){
	conversation.message({
	  input: { text: req.body.mensaje },
	  context : req.body.context,
	  workspace_id: "16e98d02-c18c-40fa-a71a-3a73549ca8d0"
	 }, function(err, response) {
	     if (err) {
	       res.send(err);
	     } else {
	       res.send(response);
	     }
	});
});
app.post("/session",function(req,res){
	User.findOne({ruc:req.body.ruc,
				  password:req.body.password
	},"",function(err,user){
		if(user){

		}
		else{
			er = {
				mensaje: "USUARIO NO EXISTE",
				codigo: 0
			}
			res.send(er);

		}
	}).then(function(us){
		er = {
			mensaje: us.name,
			token: jwt.sign({
				ruc: req.body.ruc
			},'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4'),
			codigo: 1
		}
		res.send(er);
	},function(err){
		er = {
			mensaje: err,
			codigo: 0
		}
		res.send(er);

	});
});



app.get("/", function(req, res){
	 res.render("index",{ 
	 title : 'Formulario para subir archivos con NodeJS y Express'
	 });
});

var fs = require('fs');
// Configure a client instance


//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------VENTAS------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

app.post("/ventas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
	  	Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"_id": 0,
			"TotalVentas" : 1,
			"Fecha" : 1
		},function(err,user){

			r =[];
			nombres = [];
			meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			for(var m =0;m<6;m++){
				var Total = 0;
				var date = new Date();
				var firstDay = new Date(date.getFullYear(),date.getMonth() , 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay.setMonth(firstDay.getMonth()- (6-m));
				lastDay.setMonth(lastDay.getMonth() - (6-m));
				nombres.push(meses[firstDay.getMonth()])
				for ( var i in user){
					fecha = Number(new Date(user[i]["Fecha"]));
					if (firstDay<=fecha && fecha<=lastDay){
						Total = Total +user[i]["TotalVentas"];
					}
				}
				r.push(Total);
			}
			se ={
				data: r,
				nombres : nombres
			}
			res.send(se);
		}).then(function(us){
		},function(err){
			er = {
				message : "No hay data de esa fecha",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});

});

app.post("/ventas/estrategias",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
	  	Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"_id": 0,
			"TotalVentas" : 1,
			"Fecha" : 1
		},function(err,user){

			r =[];
			nombres = [];
			meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			for(var m =0;m<2;m++){
				var Total = 0;
				var date = new Date();
				var firstDay = new Date(date.getFullYear(),date.getMonth() , 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay.setMonth(firstDay.getMonth()- (2-m));
				lastDay.setMonth(lastDay.getMonth() - (2-m));
				nombres.push(meses[firstDay.getMonth()])
				for ( var i in user){
					fecha = Number(new Date(user[i]["Fecha"]));
					if (firstDay<=fecha && fecha<=lastDay){
						Total = Total +user[i]["TotalVentas"];
					}
				}
				r.push(Total);
			}
			if (r[0]>r[1]){
				men = "Estas bajando tus ventas";
			}
			else{
				men = "Sigue asi, animo";
			}
			se ={
				data: r,
				nombres : nombres,
				mensaje: men
			}
			res.send(se);
		}).then(function(us){
		},function(err){
			er = {
				message : "No hay data de esa fecha",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});

});
app.post("/ventas/proyectadas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"_id": 0,
			"TotalVentas" : 1,
			"Fecha" : 1
		},function(err,user){

			r =[];
			o =[0,1,2,3,4,5];
			for(var m =0;m<6;m++){
				var Total = 0;
				var date = new Date();
				var firstDay = new Date(date.getFullYear(),date.getMonth() , 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay.setMonth(firstDay.getMonth()- (6-m));
				lastDay.setMonth(lastDay.getMonth() - (6-m));
				for ( var i in user){
					fecha = Number(new Date(user[i]["Fecha"]));
					if (firstDay<=fecha && fecha<=lastDay){
						Total = Total +user[i]["TotalVentas"];
					}
				}
				r.push(Total);
			}
			const SLR = require('ml-regression').SLR;
			let inputs = o;
			let outputs = r;
			let regression = new SLR(inputs, outputs);
			sen= [];
			for ( y = 6;y<12;y++ ){
				sen.push(regression.predict(y));
			}
			meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			nombres = [];
			date = new Date();
			for (var l in sen ){
				nombres.push(meses[date.getMonth()]);
				date.setMonth(date.getMonth()+1);
			} 
			se ={
				data: sen,
				nombres : nombres
			}
			res.send(se);
		}).then(function(us){
		},function(err){
			er = {
				message : "No hay data de esa fecha",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/producto/mas/vendido",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"items.CantidadVendida": 1,
			"items.DescripcionItem": 1,
			"items.Utilidad": 1
		},function(err,user){
			var sum =0;
			productos = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				for (var h in user[j]["items"]){
					productos.push(user[j]["items"][h]["DescripcionItem"]);
				}
			}
			console.log(sum);
			productos = unique(productos);
			ranking = [];
			for (var i in productos){
				sumpro= 0;
				for (var j in user){
					for (var h in user[j]["items"]){
						if ( productos[i] == user[j]["items"][h]["DescripcionItem"]){
							sumpro = sumpro + user[j]["items"][h]["Utilidad"];
						}
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					producto : productos[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['producto']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/clientes/mas/vendido",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"RazonCliente": 1
		},function(err,user){
			var sum =0;
			proveedores = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				proveedores.push(user[j]["RazonCliente"]);
			}
			proveedores = unique(proveedores);
			ranking = [];
			for (var i in proveedores){
				sumpro= 0;
				for (var h in user){
					if ( proveedores[i] == user[h]["RazonCliente"]){
						sumpro = sumpro + user[h]["TotalVentas"];
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					clientes : proveedores[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['proveedores']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------COMPRAS-----------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

app.post("/compras",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
	  	Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"_id": 0,
			"TotalVentas" : 1,
			"Fecha" : 1
		},function(err,user){

			r =[];
			nombres = [];
			meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			for(var m =0;m<6;m++){
				var Total = 0;
				var date = new Date();
				var firstDay = new Date(date.getFullYear(),date.getMonth() , 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay.setMonth(firstDay.getMonth()- (6-m));
				lastDay.setMonth(lastDay.getMonth() - (6-m));
				nombres.push(meses[firstDay.getMonth()])
				for ( var i in user){
					fecha = Number(new Date(user[i]["Fecha"]));
					if (firstDay<=fecha && fecha<=lastDay){
						Total = Total +user[i]["TotalVentas"];
					}
				}
				r.push(Total);
			}
			se ={
				data: r,
				nombres : nombres
			}
			res.send(se);
		}).then(function(us){
		},function(err){
			er = {
				message : "No hay data de esa fecha",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});

});

app.post("/compras/estrategias",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
	  	Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"_id": 0,
			"TotalVentas" : 1,
			"Fecha" : 1
		},function(err,user){

			r =[];
			nombres = [];
			meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			for(var m =0;m<2;m++){
				var Total = 0;
				var date = new Date();
				var firstDay = new Date(date.getFullYear(),date.getMonth() , 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay.setMonth(firstDay.getMonth()- (2-m));
				lastDay.setMonth(lastDay.getMonth() - (2-m));
				nombres.push(meses[firstDay.getMonth()])
				for ( var i in user){
					fecha = Number(new Date(user[i]["Fecha"]));
					if (firstDay<=fecha && fecha<=lastDay){
						Total = Total +user[i]["TotalVentas"];
					}
				}
				r.push(Total);
			}
			if (r[0]>r[1]){
				men = "Estas bajando tus compras";
			}
			else{
				men = "Sigue asi, animo";
			}
			se ={
				data: r,
				nombres : nombres,
				mensaje: men
			}
			res.send(se);
		}).then(function(us){
		},function(err){
			er = {
				message : "No hay data de esa fecha",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});

});
app.post("/compras/proyectadas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"_id": 0,
			"TotalVentas" : 1,
			"Fecha" : 1
		},function(err,user){

			r =[];
			o =[0,1,2,3,4,5];
			for(var m =0;m<6;m++){
				var Total = 0;
				var date = new Date();
				var firstDay = new Date(date.getFullYear(),date.getMonth() , 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay.setMonth(firstDay.getMonth()- (6-m));
				lastDay.setMonth(lastDay.getMonth() - (6-m));
				for ( var i in user){
					fecha = Number(new Date(user[i]["Fecha"]));
					if (firstDay<=fecha && fecha<=lastDay){
						Total = Total +user[i]["TotalVentas"];
					}
				}
				r.push(Total);
			}
			const SLR = require('ml-regression').SLR;
			let inputs = o;
			let outputs = r;
			let regression = new SLR(inputs, outputs);
			sen= [];
			for ( y = 6;y< 12;y++ ){
				sen.push(regression.predict(y));
			}
			meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
			nombres = [];
			date = new Date();
			for (var l in sen ){
				nombres.push(meses[date.getMonth()]);
				date.setMonth(date.getMonth()+1);
			} 
			se ={
				data: sen,
				nombres : nombres
			}
			res.send(se);
		}).then(function(us){
		},function(err){
			er = {
				message : "No hay data de esa fecha",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/producto/mas/comprado",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"TotalVentas": 1,
			"items.CantidadVendida": 1,
			"items.DescripcionItem": 1,
			"items.Utilidad": 1
		},function(err,user){
			var sum =0;
			productos = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				for (var h in user[j]["items"]){
					productos.push(user[j]["items"][h]["DescripcionItem"]);
				}
			}
			console.log(sum);
			productos = unique(productos);
			ranking = [];
			for (var i in productos){
				sumpro= 0;
				for (var j in user){
					for (var h in user[j]["items"]){
						if ( productos[i] == user[j]["items"][h]["DescripcionItem"]){
							sumpro = sumpro + user[j]["items"][h]["Utilidad"];
						}
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					producto : productos[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['producto']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/proveedor/mas/comprado",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"TotalVentas": 1,
			"RazonVendedor": 1
		},function(err,user){
			var sum =0;
			proveedores = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				proveedores.push(user[j]["RazonVendedor"]);
			}
			proveedores = unique(proveedores);
			ranking = [];
			for (var i in proveedores){
				sumpro= 0;
				for (var h in user){
					if ( proveedores[i] == user[h]["RazonVendedor"]){
						sumpro = sumpro + user[h]["TotalVentas"];
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					clientes : proveedores[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['proveedores']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------PROVEEDORES------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
app.post("/proveedores/caracteristicas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"_id": 0,
			"RucVendedor": 1,
			"RazonVendedor": 1,
			"DomicilioVendedor": 1,
			"DistritoVendedor": 1,
			"CiudadVendedor": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc"
			};
			res.send(er);

		});
	  }
	  
	});
	
}); 


app.post("/Proveedores/mas/vendido",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"TotalVentas": 1,
			"RazonVendedor": 1
		},function(err,user){
			var sum =0;
			proveedores = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				proveedores.push(user[j]["RazonVendedor"]);
			}
			proveedores = unique(proveedores);
			ranking = [];
			for (var i in proveedores){
				sumpro= 0;
				for (var h in user){
					if ( proveedores[i] == user[h]["RazonVendedor"]){
						sumpro = sumpro + user[h]["TotalVentas"];
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					clientes : proveedores[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['proveedores']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

app.post("/proveedores/caracteristicas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"TotalVentas": 1,
			"RazonVendedor": 1
		},function(err,user){
			var sum =0;
			proveedores = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				proveedores.push(user[j]["RazonVendedor"]);
			}
			proveedores = unique(proveedores);
			ranking = [];
			for (var i in proveedores){
				sumpro= 0;
				for (var h in user){
					if ( proveedores[i] == user[h]["RazonVendedor"]){
						sumpro = sumpro + user[h]["TotalVentas"];
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					clientes : proveedores[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			/*
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['proveedores']));
			}
			op = {
				Datas : datas,
				Nombre : ['ZV DISTRIBUIDORES S.A.C','EB DISTRIBUIDORES S.A.C','GF DISTRIBUIDORES S.A.C']
			};*/
			res.send(ranking);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------CLIENTES------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------


app.post("/clientes/caracteristicas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"RazonCliente": 1,
			"RucCliente" : 1,
			"DomicilioCliente" : 1,
			"ContactoCliente" : 1
		},function(err,user){
			var sum =0;
			proveedores = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				proveedores.push(user[j]["RazonCliente"]);
			}
			proveedores = unique(proveedores);
			ranking = [];
			for (var i in proveedores){
				sumpro= 0;
				ruc = 0;
				Dom = "";
				Con = "";
				for (var h in user){
					if ( proveedores[i] == user[h]["RazonCliente"]){
						sumpro = sumpro + user[h]["TotalVentas"];
						ruc = user[h]["RucCliente"];
						Dom = user[h]["DomicilioCliente"];
						Con =user[h]["ContactoCliente"];
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					RucCliente: ruc,
					DomicilioCliente: Dom,
					ContactoCliente: Con,
					clientes : proveedores[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);

			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			/*
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['proveedores']));
			}
			op = {
				Datas : datas,
				Nombre : ['ZV DISTRIBUIDORES S.A.C','EB DISTRIBUIDORES S.A.C','GF DISTRIBUIDORES S.A.C']
			};*/
			res.send(ranking);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

app.post("/clientes/mas/cantidad",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"RazonCliente": 1,
			"items.CantidadVendida": 1
		},function(err,user){
			var sum =0;
			proveedores = [];
			for (var j in user){
				for (var h in user[j]["items"]){
					sum = sum + user[j]["items"][h]["CantidadVendida"];
				}
				proveedores.push(user[j]["RazonCliente"]);
			}
			proveedores = unique(proveedores);
			ranking = [];
			for (var i in proveedores){
				sumpro= 0;
				for (var h in user){
					if ( proveedores[i] == user[h]["RazonCliente"]){
						for (var h in user[j]["items"]){
							sumpro = sumpro + user[j]["items"][h]["CantidadVendida"];
						}
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					clientes : proveedores[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['proveedores']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------METAS---------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------

app.post("/metas/subir",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
	  	var metas = new Metas({mensaje: req.body.mensaje,
	  						  fecha : req.body.fecha,
	  						  ruc: decoded.ruc
					});
		metas.save().then(function(us){
			er = {
				mensaje: "Recibimos tus datos ",
				codigo: 1
			}
			res.send(er);
		},function(err){
			er = {
				mensaje: "Datos Incorrectos",
				codigo: 2
			}
			res.send(er); 
		});
	  }
	  
	});
	
});

app.post("/metas/random",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Metas.findOne({
			"ruc":decoded.ruc
		},{
			"_id": 0,
			"mensaje": 1,
			"fecha": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

app.post("/metas/totales",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Metas.find({
			"ruc":decoded.ruc
		},{
			"_id": 1,
			"mensaje": 1,
			"fecha": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

app.post("/metas/eliminar",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Metas.findByIdAndRemove({_id: req.body.id}, 
		   function(err, docs){
			er = {
				message : "Hecho",
				codigo : 1
			};
			res.send(er);
		});
	  }
	  
	});
	
});

app.post("/vendedor",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.findOne({
			"RucVendedor":decoded.ruc
		},{
			"_id": 0,
			"RucVendedor": 1,
			"RazonVendedor": 1,
			"DomicilioVendedor": 1,
			"DistritoVendedor": 1,
			"CiudadVendedor": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/producto/inventarios",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"items.CantidadVendida": 1,
			"items.DescripcionItem": 1,
			"items.Utilidad": 1
		},function(err,user){
			var sum =0;
			productos = [];
			for (var j in user){
				
				for (var h in user[j]["items"]){
					if (user[j]["items"][h]["CantidadVendida"]!= undefined){
						sum = sum + user[j]["items"][h]["CantidadVendida"];
					}
					productos.push(user[j]["items"][h]["DescripcionItem"]);
				}
			}
			productos = unique(productos);
			ranking = [];
			for (var i in productos){
				sumpro= 0;
				for (var j in user){
					for (var h in user[j]["items"]){
						if ( productos[i] == user[j]["items"][h]["DescripcionItem"]){
							sumpro = sumpro + user[j]["items"][h]["CantidadVendida"];
						}
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					producto : productos[i],
					porcentaje : porcentaje,
					ventas : sumpro
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			datas = [];
			nombres = [];
			for (var k in ranking){
				datas.push(ranking[k]['porcentaje']);
				nombres.push(cut(ranking[k]['producto']));
			}
			op = {
				Datas : datas,
				Nombre : nombres
			};
			res.send(op);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/producto/precios",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"items.CantidadVendida": 1,
			"items.PrecioConImpuest": 1,
			"items.DescripcionItem": 1,
			"items.Utilidad": 1
		},function(err,user){
			var sum =0;
			productos = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				for (var h in user[j]["items"]){
					productos.push(user[j]["items"][h]["DescripcionItem"]);
				}
			}
			console.log(sum);
			productos = unique(productos);
			ranking = [];
			for (var i in productos){
				sumpro= [];
				for (var j in user){
					for (var h in user[j]["items"]){
						if ( productos[i] == user[j]["items"][h]["DescripcionItem"]){
							sumpro.push(user[j]["items"][h]["PrecioConImpuest"]);
						}
					}
				}
				p = {
					producto : productos[i],
					precios : sumpro,
					ventas : sumpro
				}
				ranking.push(p);
			}
			res.send(ranking);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});





app.post("/producto/caracteristicas",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"TotalVentas": 1,
			"items.CantidadVendida": 1,
			"items.DescripcionItem": 1,
			"items.PrecioConImpuest": 1,
			"items.Utilidad": 1
		},function(err,user){
			var sum =0;
			productos = [];
			for (var j in user){
				sum = sum + user[j]["TotalVentas"];
				for (var h in user[j]["items"]){
					productos.push(user[j]["items"][h]["DescripcionItem"]);
				}
			}
			console.log(sum);
			productos = unique(productos);
			ranking = [];
			for (var i in productos){
				sumpro= 0;
				cant = 0;
				pre = 0;
				for (var j in user){
					for (var h in user[j]["items"]){
						if ( productos[i] == user[j]["items"][h]["DescripcionItem"]){
							pre = user[j]["items"][h]['PrecioConImpuest'];
							sumpro = sumpro + user[j]["items"][h]["Utilidad"];
							cant = cant + user[j]["items"][h]["CantidadVendida"];
						}
					}
				}
				porcentaje = (sumpro/sum)*100;
				p = {
					producto : cut(productos[i]),
					porcentaje : porcentaje,
					ventas : sumpro,
					CantidadVendida : cant,
					Precio : pre
				}
				ranking.push(p);
			}
			ranking = sortBy(ranking, 'porcentaje');
			ranking = ranking.reverse();
			res.send(ranking);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});
	
});

app.post("/clientes",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":req.body.RucVendedor
		},{
			"_id": 0,
			"RucCliente": 1,
			"RazonCliente": 1,		
			"DomicilioCliente": 1,
			"ContactoCliente": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc"
			};
			res.send(er);

		});
	  }
	  
	});

});
app.post("/cliente",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.findOne({
			"RucCliente":decoded.ruc
		},{
			"_id": 0,
			"RucCliente": 1,
			"RazonCliente": 1,		
			"DomicilioCliente": 1,
			"ContactoCliente": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc"
			};
			res.send(er);

		});
	  }
	  
	});
	
});
app.post("/cliente/venta",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
	  	Invoice.find({
			"RucCliente":decoded.ruc
		},{
			"_id": 0,
			"items": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc"
			};
			res.send(er);

		});
	  }
	  
	});
	
});


app.post("/productos/vendidos",function(req,res){
	jwt.verify(req.body.RucVendedor, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"_id": 0,
			"items": 1
		},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc"
			};
			res.send(er);

		});
	  }
	  
	});
	
});

app.get('/invoice',function(req,res) {
		Invoice.find({},{},function(err,user){
			res.send(user);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});

	});
app.post('/subir/invoice',function(req,res) {
	//ruta temporal, puede ser algo así C:\Users\User\AppData\Local\Temp\7056-12616ij.png
	 var temporalPath = req.files.media.path;

	 var zip = new AdmZip(temporalPath);
     var zipEntries = zip.getEntries();
	 const fs = require('fs');
	 var dir = './Factura/Factura'+String(randomIntInc(1,1000));
	 if (!fs.existsSync(dir)){
	     fs.mkdirSync(dir);
	 }
     zip.extractEntryTo("Facturas/", dir, false, true);
     const testFolder = dir+'/';
	 fs.readdir(testFolder, (err, files) => {
	  files.forEach(file => {
	    var fs = require('fs'),
	    xml2js = require('xml2js');
		var parser = new xml2js.Parser();
		fs.readFile(dir+'/'+file, function(err, data) {
		    parser.parseString(data, function (err, result) {
		    	re1 = {
			        Fecha : 		result.Invoice['cbc:IssueDate'][0],
			        TipoMoneda : 	result.Invoice['cbc:DocumentCurrencyCode'][0],
			        RucVendedor: 	parseInt(result.Invoice['cac:AccountingSupplierParty'][0]['cbc:CustomerAssignedAccountID'][0]),
					RazonVendedor: 	result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
					DomicilioVendedor: 	result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
					DistritoVendedor: 	result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:District'][0],
					CiudadVendedor:  	result.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
					RucCliente: 		parseInt(result.Invoice['cac:AccountingCustomerParty'][0]['cbc:CustomerAssignedAccountID'][0]),
					RazonCliente: 		result.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
					DomicilioCliente: 	result.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
					ContactoCliente: 	result.Invoice['cac:AccountingCustomerParty'][0]['cac:AccountingContact'][0]['cbc:ElectronicMail'][0],
					TipodeCambio: 		parseFloat(result.Invoice['cac:PaymentExchangeRate'][0]['cbc:CalculationRate'][0]),
					TotalImpuestos: 	parseFloat(result.Invoice['cac:TaxTotal'][0]['cbc:TaxAmount'][0]['_']),
					Subimpuestos: 		[],
					TotalVentas: 		parseFloat(result.Invoice['cac:LegalMonetaryTotal'][0]['cbc:PayableAmount'][0]['_']),
					items: 				[]
				};
				for ( var m in result.Invoice['cac:TaxTotal'][0]['cac:TaxSubtotal']){
					re4 ={
						Impuesto: 		parseFloat(result.Invoice['cac:TaxTotal'][0]['cac:TaxSubtotal'][m]['cbc:TaxAmount'][0]['_']),
						tipoImpuesto: 	result.Invoice['cac:TaxTotal'][0]['cac:TaxSubtotal'][m]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:Name'][0]
					};
					re1.Subimpuestos.push(re4);
				}

				var re2 ={};
				for( var i in result.Invoice['cac:InvoiceLine']){
					re5 ={
						SubImpuesto2 :[]
					};
					for (var j in result.Invoice['cac:InvoiceLine'][i]['cac:TaxTotal'][0]['cac:TaxSubtotal']){
						re3 = {
							Impuesto: parseFloat(result.Invoice['cac:InvoiceLine'][i]['cac:TaxTotal'][0]['cac:TaxSubtotal'][j]['cbc:TaxAmount'][0]['_']),
							tipoImpuesto: result.Invoice['cac:InvoiceLine'][i]['cac:TaxTotal'][0]['cac:TaxSubtotal'][j]['cac:TaxCategory'][0]['cac:TaxScheme'][0]['cbc:Name'][0]
						};
						re5.SubImpuesto2.push(re3);
					}
					re2 = {
						id: 				parseInt(result.Invoice['cac:InvoiceLine'][i]['cbc:ID'][0]),
						CantidadVendida : 	parseInt(result.Invoice['cac:InvoiceLine'][i]['cbc:InvoicedQuantity'][0]['_']),
						Utilidad: 			parseFloat(result.Invoice['cac:InvoiceLine'][i]['cbc:LineExtensionAmount'][0]['_']),
						PrecioConImpuest : 	parseFloat(result.Invoice['cac:InvoiceLine'][i]['cac:PricingReference'][0]['cac:AlternativeConditionPrice'][0]['cbc:PriceAmount'][0]['_']),
						ImpuestoVenta : 	parseFloat(result.Invoice['cac:InvoiceLine'][i]['cac:TaxTotal'][0]['cbc:TaxAmount'][0]['_']),
						DescripcionItem: 	result.Invoice['cac:InvoiceLine'][i]['cac:Item'][0]['cbc:Description'][0],
						PSinImpuesto: 		parseFloat(result.Invoice['cac:InvoiceLine'][i]['cac:Price'][0]['cbc:PriceAmount'][0]['_']),
						SubImpuesto2 : 		re5.SubImpuesto2
					};  
					re1.items.push(re2);
				}

				var invoice = new Invoice(re1);

				invoice.save().then(function(us){

				},function(err){
					er = {
						mensaje: "Datos Incorrectos",
						codigo: 0
					}
					res.send(er);
				});
		    });
		});
	  });
	});
	er = {
		mensaje: "Guardado",
		codigo: 1
	}
	res.send(er);
	 //ruta final donde alojaremos el archivo, le cambiamos el nombre para que 
	 //sea estilo imagen-4365436.extension
	 /*
	 var finalPath = './' + getFirstFileName(req.files.media.name);
	 
	 //si la extension no está permitida salimos con un mensaje
	 if(checkExtension(req.files.media.name) === false)
	 {
	 var body = "El formato que intentas subir no está permitido :(";
	 res.writeHead(200, {
	    'Content-Length': body.length,
	    'Content-Type': 'text/plain' 
	 });
	 res.write(body);
	 res.end();
	 }
	 
	 //guardamos el archivo
	 fs.exists(finalPath, function(exists) 
	 {
	 //si existe
	 if(exists)
	 {
	 //cambiamos el nombre del archivo
	 finalPath = './' + getNewFileName(req.files.media.name);
	 }
	 //leemos y escribimos el nuevo archivo para guardarlo
	 fs.rename(temporalPath, finalPath, function(error) 
	 {
	 //si hay errores lanzamos una excepcion
	 if(error)
	 {
	 throw error;
	 }
	     // eliminamos el archivo temporal
	     fs.unlink(temporalPath, function() 
	     {
	     	//si hay errores lanzamos una excepcion
	     	if(error)
	     	{
	      throw error;
	     	}            
	     });
	 }); 
	 });

	 //zip.extractEntryTo("/HACKATHON_Sunat/Factura/", "./Factura/a/", false, true);*/

});

//obtiene el nuevo nombre del archivo si existe el anterior
function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
function getNewFileName(file)
{
	var f1 = getFileName(file)+"-"+getIntRandom(10,100000)+"."+getExtension(file);
	return getFileName(file)+"-"+getIntRandom(10,100000)+getBetweenSeparators(f1)+"."+getExtension(file);
}
 //crea un nombre para la imagen a subir
function getFirstFileName(file)
{
	return getFileName(file)+"-"+getIntRandom(10,1000)+"."+getExtension(file);
}
 //obtenemos la extensión de la imagen
function getExtension(file)
{
	return file.split('.').pop();
}
 //obtenemos el nombre de la imagen
function getFileName(file)
{
	return file.substr(0, file.lastIndexOf('.')) || file;
}
 //obtenemos un número entero aleatorio para el nombre de la imagen
function getIntRandom(min,max)
{
	return Math.floor((Math.random() * ((max + 1) - min)) + min);
}
 //separamos entre el - y el .
function getBetweenSeparators(str)
{
	return str.substring(str.lastIndexOf("-")+1,str.lastIndexOf("."));
}
 //comprobamos si está permitida la extensión del archivo
function checkExtension(file)
{
 //extensiones permitidas
	var allowedExtensions = ["jpg","jpeg","gif","png","rar","pdf","zip"];
 //extension del archivo
	var extension = file.split('.').pop();
 //hacemos la comprobación
	return in_array(extension, allowedExtensions) === true ? true : false;
}
function cut(palabra)
{
	if ( palabra != undefined){
		nombre = palabra.split(';');
		a = "";
		for (var u in nombre){
			if(u<3){
				a = a + nombre[u];
			}
		}
		return a;
	}
	return "Filete";
}
//funcion para comprobar valores en un array
function in_array(needle, haystack)
{
	var key = '';
	for(key in haystack){
		if(haystack[key] == needle){
			return true;
		}
	}
	return false;
 }

app.post("/impuestos",function(req,res){
	jwt.verify(req.body.RucVendedor, 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWMiOiIxMDA5NDkwNjQ2MSIsImlhdCI6MTUxMzk3NTU3M30.1UT-fkQIGUo7aOs0lNRPRORZiYCz3aOKe3KZHSrLOS4', function(err, decoded) {
	  if(err){
	  	er = {
			message : "Token Invalido",
			codigo : 0
		};
		res.send(er);
	  }
	  else{
		Invoice.find({
			"RucVendedor":decoded.ruc
		},{
			"_id": 0,
			"TotalImpuestos" : 1,
			"Fecha" : 1
		},function(err,user){
			r =[];
			inicio = Number(new Date(req.body.inicio));
			fin = Number(new Date(req.body.fin));
			console.log("inicio "+inicio+" fin "+fin);
			for ( var i in user){
				fecha = Number(new Date(user[i]["Fecha"]));
				console.log(fecha);
				if (fecha>=inicio && fecha <= fin){
					r.push(user[i]["TotalImpuestos"]);
				}
			}
			res.send(r);
		}).then(function(us){
		},function(err){
			er = {
				message : "No se encontro ruc",
				codigo : 0
			};
			res.send(er);

		});
	  }
	  
	});

});
