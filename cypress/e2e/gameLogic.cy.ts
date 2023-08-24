// tests for core game mechanics
// matching cards, score calculations, win conditions, etc.

describe("General game logic", () => {
  beforeEach(() => {
    cy.fixture("gameDeck.json").then((gameDeck) => {
      cy.visit("");
      // set the game deck to a known state
      cy.fixture("gameDeck.json").then((mockGameDeck) => {
        cy.window().invoke("setMockGameDeck", mockGameDeck);
      });
    });
  });

  describe("Card interactions", () => {
    it("matching cards, stay face up", () => {
      cy.get(".card-container .card").eq(0).click();
      cy.get(".card-container .card").eq(1).click();
      cy.get(".card-container .card")
        .eq(0)
        .should("have.class", "card-matched");
      cy.get(".card-container .card")
        .eq(1)
        .should("have.class", "card-matched");

      cy.get(".card-container .card").eq(2).click();
      cy.get(".card-container .card").eq(3).click();
      cy.get(".card-container .card")
        .eq(2)
        .should("have.class", "card-matched");
      cy.get(".card-container .card")
        .eq(3)
        .should("have.class", "card-matched");

      cy.get(".card-container .card").eq(4).click();
      cy.get(".card-container .card").eq(5).click();
      cy.get(".card-container .card")
        .eq(4)
        .should("have.class", "card-matched");
      cy.get(".card-container .card")
        .eq(5)
        .should("have.class", "card-matched");
    });

    it("non-matching cards, turned back down", () => {
      cy.get(".card-container .card").eq(0).click();
      cy.get(".card-container .card").eq(2).click();
      cy.get(".card-container .card")
        .eq(0)
        .find("img")
        .should("have.class", "card-block");
      cy.get(".card-container .card")
        .eq(2)
        .find("img")
        .should("have.class", "card-block");

      cy.get(".card-container .card").eq(1).click();
      cy.get(".card-container .card").eq(3).click();
      cy.get(".card-container .card")
        .eq(1)
        .find("img")
        .should("have.class", "card-block");
      cy.get(".card-container .card")
        .eq(3)
        .find("img")
        .should("have.class", "card-block");

      cy.get(".card-container .card").eq(4).click();
      cy.get(".card-container .card").eq(6).click();
      cy.get(".card-container .card")
        .eq(4)
        .find("img")
        .should("have.class", "card-block");
      cy.get(".card-container .card")
        .eq(6)
        .find("img")
        .should("have.class", "card-block");
    });
  });

  describe("Winning game scenario", () => {
    it("Winning game, cards match, message displays, shows 6 moves", () => {
      cy.get(".card-container .card").eq(0).click();
      cy.get(".card-container .card").eq(1).click();
      cy.get(".card-container .card").eq(2).click();
      cy.get(".card-container .card").eq(3).click();
      cy.get(".card-container .card").eq(4).click();
      cy.get(".card-container .card").eq(5).click();
      cy.get(".card-container .card").eq(6).click();
      cy.get(".card-container .card").eq(7).click();
      cy.get(".card-container .card").eq(8).click();
      cy.get(".card-container .card").eq(9).click();
      cy.get(".card-container .card").eq(10).click();
      cy.get(".card-container .card").eq(11).click();

      cy.get(".card-container .card").should("have.class", "card-matched");
      cy.get("div.scoreboard-modal").should("contain.text", "Congratulations!");
      cy.get(".move-counter").should("contain.text", "6 moves");
    });
  });

  describe("Score calculation after winning game", () => {
    it("calculates and verifies score after winning game with 6 moves and medium difficulty", () => {
      cy.get("button.difficulty-button").click();

      cy.fixture("gameDeck.json").then((mockGameDeck) => {
        cy.window().invoke("setMockGameDeck", mockGameDeck);
      });

      cy.get(".card-container .card").eq(0).click();
      cy.get(".card-container .card").eq(1).click();
      cy.wait(2000);
      cy.get(".card-container .card").eq(2).click();
      cy.get(".card-container .card").eq(3).click();
      cy.get(".card-container .card").eq(4).click();
      cy.get(".card-container .card").eq(5).click();
      cy.get(".card-container .card").eq(6).click();
      cy.get(".card-container .card").eq(7).click();
      cy.get(".card-container .card").eq(8).click();
      cy.get(".card-container .card").eq(9).click();
      cy.get(".card-container .card").eq(10).click();
      cy.get(".card-container .card").eq(11).click();

      // take the value shown in the timer div
      cy.get("div.timer")
        .invoke("text")
        .then((text) => {
          const timeMatch = text.match(/\d+/);
          if (timeMatch) {
            const remainingTime = parseInt(timeMatch[0]);

            cy.get(".move-counter").should("contain.text", "6 moves");

            // check score, comparing to actual score calculation
            // score = 9999999 - (movesTaken * 55512 + gameTimer * 115857);
            const expectedScore =
              9999999 - (6 * 55512 + (50 - remainingTime) * 115857);
            cy.get(".score").should("contain.text", `Score: ${expectedScore}`);
          }
        });
    });
  });
});
