var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// for MongoDB by Compose service

//mongoose.connect("mongodb://localhost/primera", { useMongoClient: true });
mongoose.connect("mongodb://admin:GOSKHWGUVPKVNGTY@sl-us-south-1-portal.16.dblayer.com:28182,sl-us-south-1-portal.12.dblayer.com:28182/compose?authSource=admin&ssl=true", { useMongoClient: true });

// definicion d




var posibles_valores=["M","F"];

// Defiinicion del Schema que seria las tablas en la base de datos

var user_schema = new Schema({
	name: {type: String, required: true},
	username: {type:String,required:true,
				maxlength:[50,"Username es muy grande"]},
	ruc :{type: Number, required: true},
	password: {type:String,
				minlength:[8,"Username es muy corto"],
				validate: {
					validator: function(p){
						return this.password_confirmation == p;
					},
					message: "Las contraseñas no son iguales"
					// creacion de la propia forma de validacion
				}
			  },
	email : { type: String, require: true}
});

// creacion de un getter y setter virtual no pertenece a la tabla
user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});
// User es el nombre en la base de datos de la tabla
var User = mongoose.model("User",user_schema);
// exportacion del modelo usuario
module.exports.User = User;