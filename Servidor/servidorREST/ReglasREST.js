// .....................................................................
// ReglasREST.js
// .....................................................................
const path = require('path');
module.exports.cargar = function(servidorExpress, laLogica) {
  // .......................................................
  // GET /prueba
  // .......................................................
  servidorExpress.get('/prueba', function(peticion, respuesta) {
    console.log(" * GET /prueba ")
    respuesta.send("¡Funciona!")
  }) // get /prueba
  // .......................................................
  // GET /persona/<dni>
  // .......................................................

  servidorExpress.get('/GETsoloMedidas',
    async function(peticion, respuesta) {
      console.log(" * GET /soloMedidas ")

      // averiguo el dni
      var dato = peticion.params.dato

      console.log(dato)

      // llamo a la función adecuada de la lógica
      var res = await laLogica.GetSoloMedidas();

      console.log(res.dato);
      console.log(res.fecha);
      console.log(res.posicion);

      // si el array de resultados no tiene una casilla ...
      if (res.length < 0) {
        // 404: not found
        respuesta.status(404).send("no encontré medidas: " + dato)
        return
      }
      // todo ok
      respuesta.send(JSON.stringify(res))
    })

  servidorExpress.post('/insertarMedida',
    async function(peticion, respuesta) {
      console.log(" * POST /insertarMedida")
      var datos = JSON.parse(peticion.body)
      //console.log(datos);
      // supuesto procesamiento

      laLogica.insertarMedida(datos);

      respuesta.send("OK");
    }) // post / insertarPersona

    servidorExpress.post('/insertarUsuario',
      async function(peticion, respuesta) {
        console.log(" * POST /insertarUsuario")
        var datos = JSON.parse(peticion.body)

        // supuesto procesamiento
        laLogica.insertarUsuario(datos);

        respuesta.send("OK");
      }) // post / insertarPersona

  servidorExpress.get('/ux/html/:archivo', function(peticion, respuesta) {
    console.log(" HTML:" + peticion.params.archivo);
    var dir = path.resolve("../ux/html");
    respuesta.sendfile(dir + "/" + peticion.params.archivo);
  });
} // cargar()
// .....................................................................
// .....................................................................
