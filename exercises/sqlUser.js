// sqlUser

const { INTEGER, TEXT } = require("sequelize");

// En este ejercicio necesitarás ingresar unas Queries de SQL.
// No te asustes por la función que ves aquí debajo, no debes modificarle nada pero te explicamos de qué se trata:
// La función está creando una Base de Datos temporal en memoria, y luego ejecuta para esa Base de Datos una serie de Queries de SQL.
// Tu única tarea aquí será redactar dichas Queries como string en las variables QUERY_1, QUERY_2 y QUERY_3 siguiendo las instrucciones:

// IMPORTANTE: Para que los tests pasen, deben estar correctas las 3 Queries.

// QUERY_1 => Una Query que cree la tabla "users" con los siguientes campos:
//  - id: de tipo INTEGER y es una PRIMARY KEY
//  - name: de tipo TEXT
const QUERY_1 =  `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT
);
`; // <= Tu query en este String;

// QUERY_2 => Una Query que inserte en la tabla "users" un registro con id=14 y name='Kate Bishop'
const QUERY_2 = `
INSERT INTO users (id, name)
VALUES (14, 'Kate Bishop');
`; // <= Tu query en este String;

// QUERY_3 => Una Query que obtenga todos los campos de todos los registros de la tabla "users"
const QUERY_3 = `
SELECT * FROM users;
`; // <= Tu query en este String;

// *** NO MODIFIQUES NADA POR DEBAJO DE ESTA LÍNEA ***

const sqlite3 = require("sqlite3").verbose();

function getUserInfo(callback) {
  const db = new sqlite3.Database(":memory:");

  db.serialize(() => {
    db.run(QUERY_1);
    db.run(QUERY_2);
    db.get(QUERY_3, (err, row) => {
      callback(err, row);
    });
  });

  db.close();
}

module.exports = getUserInfo;
