const { Sequelize, DataTypes } = require("sequelize");
const defineAsoc = require("../exercises/actorXFilm");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

sequelize.define("Film", {
  id: { primaryKey: true, type: DataTypes.INTEGER },
});

sequelize.define("Actor", {
  id: { primaryKey: true, type: DataTypes.INTEGER },
});

defineAsoc(sequelize);

const { Actor, Film } = sequelize.models;

describe("El modelo 'Actor'", () => {
  it("Debe tener una relación con el modelo 'Film'", () => {
    expect(Actor.associations.Films).toBeDefined();
  });
});
describe("El modelo 'Film'", () => {
  it("Debe tener una relación con el modelo 'Actor'", () => {
    expect(Film.associations.Actors).toBeDefined();
  });
});
describe("La relación entre ambos modelos", () => {
  it("Debe ser de varios a varios, y debe estar dada a través de la tabla intermedia llamada 'ActorxFilm'", () => {
    expect(Actor.associations.Films.through.model.tableName).toBe("ActorxFilms");
    expect(Film.associations.Actors.through.model.tableName).toBe("ActorxFilms");
  });
});
