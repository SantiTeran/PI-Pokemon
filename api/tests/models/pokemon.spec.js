const { Pokemon, Type, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon API", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Pokemon Model", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
    });
  });
  describe("Type Model", () => {
    it("should throw an error if name is null", (done) => {
      Type.create({})
        .then(() => done(new Error("It requires a valid name")))
        .catch(() => done());
    });
    it("should work when its include a name", () => {
      Type.create({ name: "normal" });
    });
  });
});
