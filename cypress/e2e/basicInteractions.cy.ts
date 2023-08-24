// tests for general gameplay and interactions

describe("Game start and basic interactions", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("game should load", () => {
    cy.contains("0 moves").should("be.visible");
    cy.get("button.controller-button").should("be.visible");
  });

  it("clicking card starts timer and displays elapsed seconds", () => {
    cy.get("div.card").first().click();
    cy.get("div.timer").should("contain", "0");
    cy.wait(1000);
    cy.get("div.timer").should("contain", "1");
  });

  it("clicking card flips card and shows image", () => {
    cy.get("div.card").first().should("not.have.descendants", "img.card-image");
    cy.get("div.card").first().should("have.descendants", "img.card-block");
    cy.get("div.card").first().click();
    cy.get("div.card").first().should("have.descendants", "img.card-image");
    cy.get("div.card").first().should("not.have.descendants", "img.card-block");
  });

  it("clicking two cards registers a move", () => {
    cy.get("div.move-counter").should("contain", "0");
    cy.get("div.card").eq(0).click();
    cy.get("div.card").eq(1).click();
    cy.get("div.move-counter").should("contain", "1");
  });
});
