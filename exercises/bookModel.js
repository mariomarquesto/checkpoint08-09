// Para este ejericicio debes llevar adelante la implemetación de la siguiente función.
// Esta recibirá una instancia de Sequelize, y a la misma debes definirle un modelo siguiendo
// estas indicaciones:

// NOMBRE DEL MODELO: Book

// - id: Un identificador único de tipo entero, con incremento automático y clave primaria.
// - title: El título del libro, de tipo cadena de texto y no puede ser nulo.
// - author: El autor del libro, de tipo cadena de texto y no puede ser nulo.
// - publicationDate: La fecha de publicación del libro, de tipo fecha y no puede ser nulo.
// - genre: El género del libro, de tipo ENUM con los valores "Ficción", "No ficción" o "Fantasía", y no puede ser nulo.
// - pageCount: El número de páginas del libro, de tipo entero positivo y no puede ser nulo.
// - rating: La calificación del libro, de tipo decimal en el rango de 0 a 10, y puede ser nulo.
// - isBestseller: Un indicador booleano que indica si el libro es un superventas, con valor predeterminado en falso y no puede ser nulo.

// Recuerda que necesitarás hacer la importación correspondiente para poder utilizar los tipos de datos de Sequelize.

// Documentación con la que puedes guiarte: https://sequelize.org/docs/v6/core-concepts/model-basics/

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genre: {
      type: DataTypes.ENUM('Ficción', 'No ficción', 'Fantasía'),
      allowNull: false,
    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: [1], 
          msg: 'El número de páginas debe ser un entero positivo.',
        },
      },
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1), 
      validate: {
        min: 0,
        max: 10,
      },
    },
    isBestseller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
      allowNull: false,
    },
  });

  return Book;
};

