/**
 * @api {post} /users Registra al usuario
 * @apiVersion 1.3.0
 * @apiName Registro
 * @apiGroup Autentificacion
 *
 * @apiDescription Registra al usuario
 *
 * @apiParam {String} email Email del Usuario.
 * @apiParam {String} password Contraseña del Usuario de la Clave SOL.
 * @apiParam {String} password_confirmation Confirmacion de contraseña del Usuario.
 * @apiParam {String} name Nombre de la empresa del Usuario.
 * @apiParam {Number} ruc Ruc del Usuario.
 * @apiParam {String} username Nombre del Usuario de la Clave SOL.
 *
 *
 * @apiSuccess {String}   mensaje   Recibimos tus datos.
 * @apiSuccess {Number}   codigo    Muestra el numero 1 si se guardo.
 * 
 *
 * @apiError mensaje Datos Incorrectos.
 * @apiError codigo  Muestra el numero 2.
 *
 */

 /**
 * @api {post} /session Logea al usuario
 * @apiVersion 1.3.0
 * @apiName Login
 * @apiGroup Autentificacion
 *
 * @apiDescription Logea al usuario
 *
 * @apiParam {String} password Contraseña del Usuario de la Clave SOL.
 * @apiParam {Number} ruc Ruc del Usuario.
 *
 *
 * @apiSuccess {String}   mensaje   Recibimos tus datos.
 * @apiSuccess {Number}   codigo    Muestra el numero 1 si se guardo.
 * @apiSuccess {Number}   token    Token de Seguridad.
 * 
 *
 * @apiError mensaje Datos Incorrectos.
 * @apiError codigo  Muestra el numero 2.
 *
 */

 /**
 * @api {post} /ventas Ventas Mensuales 
 * @apiVersion 1.3.0
 * @apiName Ventas del vendedor por 6 meses
 * @apiGroup Ventas
 *
 * @apiDescription Muestra las ventas de los utlimos 6 meses del usario
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con los montos.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los meses.
 * 
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

 /**
 * @api {post} /ventas/estrategias Estrategias de Ventas
 * @apiVersion 1.3.0
 * @apiName Estrategia de Ventas
 * @apiGroup Ventas
 *
 * @apiDescription Muestra el estado de las estrategias de las ventas
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con los montos.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los meses.
 * @apiSuccess {String}   mensaje    Estado de las Estrategias de Ventas.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

  /**
 * @api {post} /ventas/proyectadas Proyeccion de las ventas
 * @apiVersion 1.3.0
 * @apiName Ventas Proyectadas
 * @apiGroup Ventas
 *
 * @apiDescription Muestra la proyeccion de las ventas en los proximos 6 meses
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con los montos.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los meses.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */
  /**
 * @api {post} /producto/mas/vendido Ranking de Productos por ventas
 * @apiVersion 1.3.0
 * @apiName Ventas de productos mas vendidos
 * @apiGroup Ventas
 *
 * @apiDescription Muestra el ranking de ventas de los productos mas vendido0 del ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de ventas que representa ese producto con el monto total de ventas del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los productos.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

   /**
 * @api {post} /clientes/mas/vendido Ranking de Clientes por Ventas
 * @apiVersion 1.3.0
 * @apiName Ranking de Clientes por VEntas
 * @apiGroup Ventas
 *
 * @apiDescription Muestra el ranking de clientes que mas compran  del ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de ventas que representa ese cliente con el monto total de ventas del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los productos.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */



 /**
 * @api {post} /compras Compras Mensuales 
 * @apiVersion 1.3.0
 * @apiName Compras del Ususario por 6 meses
 * @apiGroup Compras
 *
 * @apiDescription Muestra las compras de los utlimos 6 meses del usario
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con los montos.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los meses.
 * 
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

 /**
 * @api {post} /compras/estrategias Estrategias de Compras
 * @apiVersion 1.3.0
 * @apiName Estrategia de Compras
 * @apiGroup Compras
 *
 * @apiDescription Muestra el estado de las estrategias de las compras
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con los montos.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los meses.
 * @apiSuccess {String}   mensaje    Estado de las Estrategias de Compras.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

  /**
 * @api {post} /compras/proyectadas Proyeccion de las compras
 * @apiVersion 1.3.0
 * @apiName Compras Proyectadas
 * @apiGroup Compras
 *
 * @apiDescription Muestra la proyeccion de las compras en los proximos 6 meses
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con los montos.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los meses.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */
  /**
 * @api {post} /producto/mas/comprado Ranking de Productos por compras
 * @apiVersion 1.3.0
 * @apiName Ranking de productos mas comprados
 * @apiGroup Compras
 *
 * @apiDescription Muestra el ranking de compras de los productos mas vendido0 del ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de compras que representa ese producto con el monto total de compras del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los productos.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

   /**
 * @api {post} /proveedor/mas/comprado Ranking de Proveedores por Compras
 * @apiVersion 1.3.0
 * @apiName Ranking de Proveedores por compras
 * @apiGroup Compras
 *
 * @apiDescription Muestra el ranking de Proveedores en el ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de compras que representa ese proveedor con el monto total de compras del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los productos.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */



  /**
 * @api {post} /proveedores/caracteristicas Informacion de los proveedores
 * @apiVersion 1.3.0
 * @apiName Informacion de Proveedores
 * @apiGroup Proveedores
 *
 * @apiDescription Muestra la informacion de los proveedores
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {String}   RucVendedor   Ruc del proveedor.
 * @apiSuccess {String}   RazonVendedor    RAzon del Proveedor.
 * @apiSuccess {String}   DomicilioVendedor    Domicilio del vendedor.
 * @apiSuccess {String}   DistritoVendedor    Distrito del vendedor.
 * @apiSuccess {String}   CiudadVendedor    Ciudad del vendedor.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */
  /**
 * @api {post} /Proveedores/mas/vendido Ranking de Proveedores por compras
 * @apiVersion 1.3.0
 * @apiName Ranking de Proveedores mas comprados
 * @apiGroup Compras
 *
 * @apiDescription Muestra el ranking de compras de los Proveedores del ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de compras que representa el proveedor con el monto total de compras del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los proveedores.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

   /**
 * @api {post} /proveedores/caracteristicas Ranking de Proveedores por Compras
 * @apiVersion 1.3.0
 * @apiName Ranking de Proveedores por compras
 * @apiGroup Compras
 *
 * @apiDescription Muestra el ranking de Proveedores en el ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de compras que representa ese proveedor con el monto total de compras del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los productos.
 * @apiSuccess {Object[]}   ventas    Compras totales del proveedor.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */



  /**
 * @api {post} /proveedores/caracteristicas Informacion de los proveedores
 * @apiVersion 1.3.0
 * @apiName Informacion de Proveedores
 * @apiGroup Proveedores
 *
 * @apiDescription Muestra la informacion de los proveedores
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {String}   RucVendedor   Ruc del proveedor.
 * @apiSuccess {String}   RazonVendedor    RAzon del Proveedor.
 * @apiSuccess {String}   DomicilioVendedor    Domicilio del vendedor.
 * @apiSuccess {String}   DistritoVendedor    Distrito del vendedor.
 * @apiSuccess {String}   CiudadVendedor    Ciudad del vendedor.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */
  /**
 * @api {post} /Proveedores/mas/vendido Ranking de Proveedores por compras
 * @apiVersion 1.3.0
 * @apiName Ranking de Proveedores mas comprados
 * @apiGroup Proveedores
 *
 * @apiDescription Muestra el ranking de compras de los Proveedores del ultimo mes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de compras que representa el proveedor con el monto total de compras del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los proveedores.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */




  /**
 * @api {post} /clientes/caracteristicas Informacion de los clientes
 * @apiVersion 1.3.0
 * @apiName Informacion de Clientes
 * @apiGroup Clientes
 *
 * @apiDescription Muestra la informacion de los clientes
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Number}   ventas   Total de Ventas del Cliente.
 * @apiSuccess {String}   clientes    RAzon del Cliente.
 * @apiSuccess {Number}   porcentaje    Porcentaje de ventas por Cliente en el total.
 * @apiSuccess {String}   RucCLiente    Ruc del Cliente.
 * @apiSuccess {String}   DomicilioCliente    Domicilio del Cliente.
 * @apiSuccess {String}   ContactoCliente    Email del Cliente.
 *
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

   /**
 * @api {post} /clientes/mas/cantidad Ranking de Clientes por Cantidad
 * @apiVersion 1.3.0
 * @apiName Ranking de Clientes por Cantidad
 * @apiGroup Clientes
 *
 * @apiDescription Muestra el Ranking de Clientes por Cantidad
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {Object[]}   data   Arreglo con el porcentaje de compras que representa ese proveedor con la cantidad total vendidad del ultimo mes.
 * @apiSuccess {Object[]}   nombres    Arreglo con los nombres de los productos.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */


   /**
 * @api {post} /metas/subir Subir Metas
 * @apiVersion 1.3.0
 * @apiName Subir Metas
 * @apiGroup Metas
 *
 * @apiDescription Sube Metas
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 * @apiParam {String} mensaje Contenido de la meta.
 * @apiParam {Date} fecha Fecha de la meta.
 *
 *
 * @apiSuccess {String}   mensaje   Muestra el mensaje Recibimos tus datos
 * @apiSuccess {Number}   codigo    Muestra el numero 1.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

    /**
 * @api {post} /metas/random Muestra una meta random
 * @apiVersion 1.3.0
 * @apiName Meta Random
 * @apiGroup Metas
 *
 * @apiDescription Metas Random
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {String}   mensaje   Muestra el mensaje de la meta
 * @apiSuccess {Date}   codigo    Fecha de la Meta.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

     /**
 * @api {post} /metas/totales Muestra todas las metas
 * @apiVersion 1.3.0
 * @apiName Muestra todas las metas
 * @apiGroup Metas
 *
 * @apiDescription Muestra todas las metas
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 *
 *
 * @apiSuccess {String}   mensaje   Muestra los mensajes
 * @apiSuccess {Date}   codigo    Fecha de la Meta.
 * @apiSuccess {String}   id   id de la Meta.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */


    /**
 * @api {post} /subir/invoice Subir Invoice
 * @apiVersion 1.3.0
 * @apiName Subir Invoice
 * @apiGroup Invoice
 *
 * @apiDescription Sube Invoices
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 * @apiParam {file} file Zip de invoices.
 *
 *
 * @apiSuccess {String}   mensaje   Invoice Recibidos.
 * @apiSuccess {Date}   codigo    Muestra el numero 1.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

     /**
 * @api {post} /watson Watson
 * @apiVersion 1.3.0
 * @apiName Chatbot Watson
 * @apiGroup Watson
 *
 * @apiDescription Chatbot Watson
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 * @apiParam {String} mensaje Mensaje de Chatbot.
 * @apiParam {String} context Contexto de Chatbot.
 *
 *
 * @apiSuccess {Object[]}  response   Respuesta del Chatbot.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

   /**
 * @api {post} /metas/eliminar Elimina una meta
 * @apiVersion 1.3.0
 * @apiName Elimina una meta
 * @apiGroup Metas
 *
 * @apiDescription Elimina Metas
 *
 * @apiParam {String} RucVendedor Token de seguridad.
 * @apiParam {String} id Id de la meta.
 *
 *
 * @apiSuccess {String}   mensaje   Meta Eliminada
 * @apiSuccess {Number}   codigo    Muestra 1 si es eliminado.
 *
 * @apiError mensaje Token Invalido.
 * @apiError codigo  Muestra el numero 0.
 *
 */

