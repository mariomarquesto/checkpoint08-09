const { Sequelize, Datatypes, DataTypes } = require("sequelize");
const getStudents = require("../exercises/getStudents");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);
let result = [];
beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Student.bulkCreate([
    { name: "John", age: 20 },
    { name: "Alice", age: 22 },
    { name: "Bob", age: 18 },
    { name: "Eve", age: 20 },
  ]);
  result = await getStudents(Student);
});

describe("La función getStudents", () => {
  it("Debe retornar un array de instancias de Student", async () => {
    expect(result[0] instanceof Student).toBe(true);
  });
  it("En el array devuelto, deben estar únicamente registros correspondientes a estudiantes con edades mayores a 20", () => {
    expect(result).toHaveLength(1);
    expect(result[0].dataValues).toEqual({ age: 22, id: 2, name: "Alice" });
  });
});
