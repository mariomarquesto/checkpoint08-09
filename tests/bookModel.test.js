const bookModel = require("../exercises/bookModel");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
});

bookModel(sequelize);
const { Book } = sequelize.models;
const attributes = Book.getAttributes();

describe("El modelo Book", () => {
  it("Debe haber sido creado correctamente y con el nombre correcto", () => {
    expect(Book).toBeDefined();
  });

  it("Debe generar automáticamente los atributos createdAt y updatedAt", () => {
    expect(attributes["createdAt"]).toBeDefined();
    expect(attributes["updatedAt"]).toBeDefined();
  });

  describe("Los atributos del modelo...", () => {
    it("id: Un identificador único de tipo entero, con incremento automático y clave primaria.", () => {
      expect(attributes.id.type instanceof DataTypes.INTEGER).toBe(true);
      expect(attributes.id.primaryKey).toBe(true);
      expect(attributes.id.autoIncrement).toBe(true);
    });

    it("title: El título del libro, de tipo cadena de texto y no puede ser nulo.", () => {
      expect(attributes.title.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.title.allowNull).toBe(false);
    });

    it("author: El autor del libro, de tipo cadena de texto y no puede ser nulo.", () => {
      expect(attributes.author.type instanceof DataTypes.STRING).toBe(true);
      expect(attributes.author.allowNull).toBe(false);
    });

    it("publicationDate: La fecha de publicación del libro, de tipo fecha y no puede ser nulo.", () => {
      expect(attributes.publicationDate.type instanceof DataTypes.DATE).toBe(
        true
      );
      expect(attributes.publicationDate.allowNull).toBe(false);
    });

    it("genre: El género del libro, de tipo ENUM con los valores 'Ficción', 'No ficción' o 'Fantasía', y no puede ser nulo.", () => {
      expect(attributes.genre.type instanceof DataTypes.ENUM).toBe(true);
      expect(attributes.genre.values.includes("Ficción")).toBe(true);
      expect(attributes.genre.values.includes("No ficción")).toBe(true);
      expect(attributes.genre.values.includes("Fantasía")).toBe(true);
      expect(attributes.genre.allowNull).toBe(false);
    });

    it("pageCount: El número de páginas del libro, de tipo entero positivo y no puede ser nulo.", () => {
      
      expect(attributes.pageCount.type instanceof DataTypes.INTEGER).toBe(true);
      expect(attributes.pageCount.allowNull).toBe(false);
     
      expect(attributes.pageCount.validate.isInt).toEqual({
        args: [1],
        msg: 'El número de páginas debe ser un entero positivo.',
      });
    });
    

    it("rating: La calificación del libro, de tipo decimal en el rango de 0 a 10, y puede ser nulo.", () => {
      expect(attributes.rating.type instanceof DataTypes.DECIMAL).toBe(true);
      expect(attributes.rating.validate).toEqual({ min: 0, max: 10 });
      expect(
        attributes.rating.allowNull == true ||
          attributes.rating.allowNull == undefined
      ).toBe(true);
    });

    it("isBestseller: Un indicador booleano que indica si el libro es un superventas, con valor predeterminado en falso y no puede ser nulo.", () => {
      expect(attributes.isBestseller.type instanceof DataTypes.BOOLEAN).toBe(
        true
      );
      expect(attributes.isBestseller.defaultValue).toBe(false);
      expect(attributes.isBestseller.allowNull).toBe(false);
    });
  });
});
