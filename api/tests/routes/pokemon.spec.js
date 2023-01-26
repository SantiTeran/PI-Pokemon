/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, Type, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
});

describe("GET /pokemons/:id", () => {
  it("GET response with 200 if it finds a pokemon with the id provided", function () {
    agent.get("/pokemons/25").expect(function (res) {
      expect(res.status).equal(200);
    });
  });
});

describe("GET /pokemons?name=", () => {
  it("GET response with 200 if it find a pokemon with the name provided", function () {
    agent.get("/pokemons?name=pikachu").expect(function (res) {
      expect(res.status).equal(200);
    });
  });
});

describe("GET /types", () => {
  it("GET response with 200 if it finds all the types of pokemon", function () {
    agent.get("/types").expect(function (res) {
      expect(res.status).equal(2000);
    });
  });
});