var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// for MongoDB by Compose service

//mongoose.connect("mongodb://localhost/primera", { useMongoClient: true });
mongoose.connect("mongodb://admin:GOSKHWGUVPKVNGTY@sl-us-south-1-portal.16.dblayer.com:28182,sl-us-south-1-portal.12.dblayer.com:28182/compose?authSource=admin&ssl=true", { useMongoClient: true });

// definicion d





var user_schema = new Schema({
	mensaje: {type: String, required: true},
	fecha : {type:String,required:true},
	ruc: Number
});

// User es el nombre en la base de datos de la tabla
var Metas = mongoose.model("Metas",user_schema);
// exportacion del modelo usuario
module.exports.Metas = Metas;