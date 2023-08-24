// tests for general gameplay and interactions

describe("Game start and basic interactions", () => {
  beforeEach(() => {
    cy.visit("");
  });

  describe("Initialization", () => {
    it("game should load", () => {
      cy.contains("0 moves").should("be.visible");
      cy.get("button.controller-button").should("be.visible");
    });
  });

  describe("Card interactions", () => {
    it("clicking card starts timer and displays elapsed seconds", () => {
      cy.get("button.difficulty-button").click();
      cy.get("div.card").first().click();
      cy.get("div.timer").should("contain", "50");
      cy.wait(1000);
      cy.get("div.timer").should("contain", "49");
    });

    it("clicking card flips card and shows image", () => {
      cy.get("div.card")
        .first()
        .should("not.have.descendants", "img.card-image");
      cy.get("div.card").first().should("have.descendants", "img.card-block");
      cy.get("div.card").first().click();
      cy.get("div.card").first().should("have.descendants", "img.card-image");
      cy.get("div.card")
        .first()
        .should("not.have.descendants", "img.card-block");
    });

    it("clicking two cards registers a move", () => {
      cy.get("div.move-counter").should("contain", "0");
      cy.get("div.card").eq(0).click();
      cy.get("div.card").eq(1).click();
      cy.get("div.move-counter").should("contain", "1");
    });
  });

  describe("Game reset", () => {
    it("reset button should reset game", () => {
      cy.get("div.card").eq(0).click();
      cy.get("div.card").eq(1).click();
      cy.wait(1000);
      cy.get("div.card").eq(2).click();
      cy.wait(1000);
      cy.get("button.reset-button").click();
      cy.get("div.score").should("contain", "Score: 9999999");
      cy.get("div.move-counter").should("contain", "0 moves");
      cy.get("div.card > img").each(($img) => {
        cy.wrap($img).should("have.class", "card-block");
      });
    });
  });

  describe("Difficulty levels", () => {
    it("difficulty button should change difficulty", () => {
      cy.get("div.card").should("have.length", 12);
      cy.get("button.difficulty-button").should("contain", "easy");
      cy.get("button.difficulty-button").click();
      cy.get("div.card").should("have.length", 16);
      cy.get("button.difficulty-button").should("contain", "medium");
      cy.get("div.timer").should("contain", "50");
      cy.get("button.difficulty-button").click();
      cy.get("div.card").should("have.length", 20);
      cy.get("button.difficulty-button").should("contain", "hard");
      cy.get("div.timer").should("contain", "40");
    });
  });
});
