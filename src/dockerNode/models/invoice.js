var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// for MongoDB by Compose service
//mongoose.connect("mongodb://localhost/primera", { useMongoClient: true });
mongoose.connect("mongodb://admin:GOSKHWGUVPKVNGTY@sl-us-south-1-portal.16.dblayer.com:28182,sl-us-south-1-portal.12.dblayer.com:28182/compose?authSource=admin&ssl=true", { useMongoClient: true });

// Defiinicion del Schema que seria las tablas en la base de datos

var invoice_schema = new Schema({
	Fecha : 		String,
	TipoMoneda : 	String,
	RucVendedor: 	Number,
	RazonVendedor: 	String,
	DomicilioVendedor: 	String,
	DistritoVendedor: 	String,
	CiudadVendedor:  	String,
	RucCliente: 		Number,
	RazonCliente: 		String,
	DomicilioCliente: 	String,
	ContactoCliente: 	String,
	TipodeCambio: 		Number,
	TotalImpuestos: 	Number,
	Subimpuestos: 		[{
						    type: Schema.Types.Mixed,
						    ref: 'Impuestos'
						}],
	TotalVentas: 		Number,
	items: 				[{
						    type: Schema.Types.Mixed,
						    ref: 'Items'
						}]
});
var invoice_impuesto = new Schema ({
		Impuesto: 	Number,
		tipoImpuesto: String
});
var invoice_items = new Schema ({
		id: 				Number,
		CantidadVendida : 	Number,
		Utilidad: 			Number,
		PrecioConImpuest :  Number,
		ImpuestoVenta : 	Number,
		DescripcionItem: 	String,
		PSinImpuesto: 		Number,
		SubImpuesto2 : 		[{
							    type: Schema.Types.Mixed,
						    	ref: 'Impuestos'
							}]
});
// User es el nombre en la base de datos de la tabla
var Impuesto = mongoose.model('Impuestos',invoice_impuesto);
var Items = mongoose.model('Items',invoice_items);
var Invoice = mongoose.model("Invoice",invoice_schema);
// exportacion del modelo usuario
module.exports.Invoice = Invoice;


// Defiinicion del Schema que seria las tablas en la base de datos
