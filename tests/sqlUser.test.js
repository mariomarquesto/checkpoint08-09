const getUserInfo = require("../exercises/sqlUser");

describe("La tabla 'users' de la Base de Datos", () => {
  it("Debe haber sido creada correctamente con los valores correspondientes insertados", (done) => {
    getUserInfo((err, row) => {
      expect(err).toBeNull();
      expect(row).toEqual({ id: 14, name: "Kate Bishop" });
      done();
    });
  });
});
