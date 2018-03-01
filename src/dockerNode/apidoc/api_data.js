define({ "api": [
  {
    "type": "post",
    "url": "/session",
    "title": "Logea al usuario",
    "version": "1.3.0",
    "name": "Login",
    "group": "Autentificacion",
    "description": "<p>Logea al usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del Usuario de la Clave SOL.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ruc",
            "description": "<p>Ruc del Usuario.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Recibimos tus datos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 1 si se guardo.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "token",
            "description": "<p>Token de Seguridad.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Datos Incorrectos.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 2.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Autentificacion"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Registra al usuario",
    "version": "1.3.0",
    "name": "Registro",
    "group": "Autentificacion",
    "description": "<p>Registra al usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email del Usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Contraseña del Usuario de la Clave SOL.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password_confirmation",
            "description": "<p>Confirmacion de contraseña del Usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nombre de la empresa del Usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ruc",
            "description": "<p>Ruc del Usuario.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nombre del Usuario de la Clave SOL.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Recibimos tus datos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 1 si se guardo.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Datos Incorrectos.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 2.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Autentificacion"
  },
  {
    "type": "post",
    "url": "/clientes/caracteristicas",
    "title": "Informacion de los clientes",
    "version": "1.3.0",
    "name": "Informacion_de_Clientes",
    "group": "Clientes",
    "description": "<p>Muestra la informacion de los clientes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ventas",
            "description": "<p>Total de Ventas del Cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "clientes",
            "description": "<p>RAzon del Cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "porcentaje",
            "description": "<p>Porcentaje de ventas por Cliente en el total.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RucCLiente",
            "description": "<p>Ruc del Cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DomicilioCliente",
            "description": "<p>Domicilio del Cliente.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ContactoCliente",
            "description": "<p>Email del Cliente.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Clientes"
  },
  {
    "type": "post",
    "url": "/clientes/mas/cantidad",
    "title": "Ranking de Clientes por Cantidad",
    "version": "1.3.0",
    "name": "Ranking_de_Clientes_por_Cantidad",
    "group": "Clientes",
    "description": "<p>Muestra el Ranking de Clientes por Cantidad</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de compras que representa ese proveedor con la cantidad total vendidad del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los productos.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Clientes"
  },
  {
    "type": "post",
    "url": "/compras/proyectadas",
    "title": "Proyeccion de las compras",
    "version": "1.3.0",
    "name": "Compras_Proyectadas",
    "group": "Compras",
    "description": "<p>Muestra la proyeccion de las compras en los proximos 6 meses</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con los montos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los meses.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/compras",
    "title": "Compras Mensuales",
    "version": "1.3.0",
    "name": "Compras_del_Ususario_por_6_meses",
    "group": "Compras",
    "description": "<p>Muestra las compras de los utlimos 6 meses del usario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con los montos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los meses.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/compras/estrategias",
    "title": "Estrategias de Compras",
    "version": "1.3.0",
    "name": "Estrategia_de_Compras",
    "group": "Compras",
    "description": "<p>Muestra el estado de las estrategias de las compras</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con los montos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los meses.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Estado de las Estrategias de Compras.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/Proveedores/mas/vendido",
    "title": "Ranking de Proveedores por compras",
    "version": "1.3.0",
    "name": "Ranking_de_Proveedores_mas_comprados",
    "group": "Compras",
    "description": "<p>Muestra el ranking de compras de los Proveedores del ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de compras que representa el proveedor con el monto total de compras del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los proveedores.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/proveedores/caracteristicas",
    "title": "Ranking de Proveedores por Compras",
    "version": "1.3.0",
    "name": "Ranking_de_Proveedores_por_compras",
    "group": "Compras",
    "description": "<p>Muestra el ranking de Proveedores en el ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de compras que representa ese proveedor con el monto total de compras del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los productos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "ventas",
            "description": "<p>Compras totales del proveedor.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/proveedor/mas/comprado",
    "title": "Ranking de Proveedores por Compras",
    "version": "1.3.0",
    "name": "Ranking_de_Proveedores_por_compras",
    "group": "Compras",
    "description": "<p>Muestra el ranking de Proveedores en el ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de compras que representa ese proveedor con el monto total de compras del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los productos.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/producto/mas/comprado",
    "title": "Ranking de Productos por compras",
    "version": "1.3.0",
    "name": "Ranking_de_productos_mas_comprados",
    "group": "Compras",
    "description": "<p>Muestra el ranking de compras de los productos mas vendido0 del ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de compras que representa ese producto con el monto total de compras del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los productos.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Compras"
  },
  {
    "type": "post",
    "url": "/subir/invoice",
    "title": "Subir Invoice",
    "version": "1.3.0",
    "name": "Subir_Invoice",
    "group": "Invoice",
    "description": "<p>Sube Invoices</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "file",
            "description": "<p>Zip de invoices.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Invoice Recibidos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 1.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Invoice"
  },
  {
    "type": "post",
    "url": "/metas/eliminar",
    "title": "Elimina una meta",
    "version": "1.3.0",
    "name": "Elimina_una_meta",
    "group": "Metas",
    "description": "<p>Elimina Metas</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id de la meta.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Meta Eliminada</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra 1 si es eliminado.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Metas"
  },
  {
    "type": "post",
    "url": "/metas/random",
    "title": "Muestra una meta random",
    "version": "1.3.0",
    "name": "Meta_Random",
    "group": "Metas",
    "description": "<p>Metas Random</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Muestra el mensaje de la meta</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "codigo",
            "description": "<p>Fecha de la Meta.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Metas"
  },
  {
    "type": "post",
    "url": "/metas/totales",
    "title": "Muestra todas las metas",
    "version": "1.3.0",
    "name": "Muestra_todas_las_metas",
    "group": "Metas",
    "description": "<p>Muestra todas las metas</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Muestra los mensajes</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "codigo",
            "description": "<p>Fecha de la Meta.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id de la Meta.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Metas"
  },
  {
    "type": "post",
    "url": "/metas/subir",
    "title": "Subir Metas",
    "version": "1.3.0",
    "name": "Subir_Metas",
    "group": "Metas",
    "description": "<p>Sube Metas</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Contenido de la meta.</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "fecha",
            "description": "<p>Fecha de la meta.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Muestra el mensaje Recibimos tus datos</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 1.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Metas"
  },
  {
    "type": "post",
    "url": "/proveedores/caracteristicas",
    "title": "Informacion de los proveedores",
    "version": "1.3.0",
    "name": "Informacion_de_Proveedores",
    "group": "Proveedores",
    "description": "<p>Muestra la informacion de los proveedores</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Ruc del proveedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RazonVendedor",
            "description": "<p>RAzon del Proveedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DomicilioVendedor",
            "description": "<p>Domicilio del vendedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DistritoVendedor",
            "description": "<p>Distrito del vendedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CiudadVendedor",
            "description": "<p>Ciudad del vendedor.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Proveedores"
  },
  {
    "type": "post",
    "url": "/proveedores/caracteristicas",
    "title": "Informacion de los proveedores",
    "version": "1.3.0",
    "name": "Informacion_de_Proveedores",
    "group": "Proveedores",
    "description": "<p>Muestra la informacion de los proveedores</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Ruc del proveedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "RazonVendedor",
            "description": "<p>RAzon del Proveedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DomicilioVendedor",
            "description": "<p>Domicilio del vendedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "DistritoVendedor",
            "description": "<p>Distrito del vendedor.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "CiudadVendedor",
            "description": "<p>Ciudad del vendedor.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Proveedores"
  },
  {
    "type": "post",
    "url": "/Proveedores/mas/vendido",
    "title": "Ranking de Proveedores por compras",
    "version": "1.3.0",
    "name": "Ranking_de_Proveedores_mas_comprados",
    "group": "Proveedores",
    "description": "<p>Muestra el ranking de compras de los Proveedores del ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de compras que representa el proveedor con el monto total de compras del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los proveedores.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Proveedores"
  },
  {
    "type": "post",
    "url": "/ventas/estrategias",
    "title": "Estrategias de Ventas",
    "version": "1.3.0",
    "name": "Estrategia_de_Ventas",
    "group": "Ventas",
    "description": "<p>Muestra el estado de las estrategias de las ventas</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con los montos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los meses.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Estado de las Estrategias de Ventas.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Ventas"
  },
  {
    "type": "post",
    "url": "/clientes/mas/vendido",
    "title": "Ranking de Clientes por Ventas",
    "version": "1.3.0",
    "name": "Ranking_de_Clientes_por_VEntas",
    "group": "Ventas",
    "description": "<p>Muestra el ranking de clientes que mas compran  del ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de ventas que representa ese cliente con el monto total de ventas del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los productos.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Ventas"
  },
  {
    "type": "post",
    "url": "/ventas/proyectadas",
    "title": "Proyeccion de las ventas",
    "version": "1.3.0",
    "name": "Ventas_Proyectadas",
    "group": "Ventas",
    "description": "<p>Muestra la proyeccion de las ventas en los proximos 6 meses</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con los montos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los meses.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Ventas"
  },
  {
    "type": "post",
    "url": "/producto/mas/vendido",
    "title": "Ranking de Productos por ventas",
    "version": "1.3.0",
    "name": "Ventas_de_productos_mas_vendidos",
    "group": "Ventas",
    "description": "<p>Muestra el ranking de ventas de los productos mas vendido0 del ultimo mes</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con el porcentaje de ventas que representa ese producto con el monto total de ventas del ultimo mes.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los productos.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Ventas"
  },
  {
    "type": "post",
    "url": "/ventas",
    "title": "Ventas Mensuales",
    "version": "1.3.0",
    "name": "Ventas_del_vendedor_por_6_meses",
    "group": "Ventas",
    "description": "<p>Muestra las ventas de los utlimos 6 meses del usario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "data",
            "description": "<p>Arreglo con los montos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "nombres",
            "description": "<p>Arreglo con los nombres de los meses.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Ventas"
  },
  {
    "type": "post",
    "url": "/watson",
    "title": "Watson",
    "version": "1.3.0",
    "name": "Chatbot_Watson",
    "group": "Watson",
    "description": "<p>Chatbot Watson</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "RucVendedor",
            "description": "<p>Token de seguridad.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Mensaje de Chatbot.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "context",
            "description": "<p>Contexto de Chatbot.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "response",
            "description": "<p>Respuesta del Chatbot.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "mensaje",
            "description": "<p>Token Invalido.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "codigo",
            "description": "<p>Muestra el numero 0.</p>"
          }
        ]
      }
    },
    "filename": "myapp/example.js",
    "groupTitle": "Watson"
  }
] });
