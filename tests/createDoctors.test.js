const { Sequelize, DataTypes } = require("sequelize");
const createDoctors = require("../exercises/createDoctors");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

const doctors = [
  { id: 1, name: "Dr. Chapatín", area: "Queles" },
  { id: 2, name: "Dr. Strange", area: "Hechiero Supremo" },
  { id: 3, name: "Dr. Who", area: "Time Traveler" },
];

beforeAll(async () => {
  sequelize.define(
    "Doctor",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING },
      area: { type: DataTypes.STRING },
    },
    { timestamps: false }
  );
  await sequelize.sync({ force: true });
  await createDoctors(sequelize, doctors);
});

describe("Para el modelo Doctor", () => {
  it("Deben haberse creado todos los registros/instancias correspondientes", async () => {
    const results = await sequelize.models.Doctor.findAll();
    expect(results).toHaveLength(3);
    expect(results.every((r) => r.name)).toBe(true);
    expect(results.every((r) => r.id)).toBe(true);
    expect(results.every((r) => r.area)).toBe(true);
    expect(results.some((r) => r.name === "Dr.Chapatín"));
    expect(results.some((r) => r.name === "Dr.Strange"));
    expect(results.some((r) => r.area === "Time Traveler"));
    expect(results.some((r) => r.area === "Queles"));
  });
});
