// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />
import "cypress-react-selector";
import { API_URL } from "../../src/config/api";

context("Window", () => {
  before(() => {
    cy.visit("./build/index.html");
    cy.waitForReact();
  });

  it("End-2-End single bank donation", () => {
    cy.pickRecurring(false);
    cy.pickMethod("bank");
    cy.inputDonorValues();

    cy.intercept("POST", `${API_URL}/donations/register`).as(
      "registerDonation"
    );

    cy.get("button").click();
    cy.wait(500);

    cy.get("button").click();
    cy.wait("@registerDonation")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
    cy.wait(500);

    cy.get("[data-cy=nextReferral]").click();

    cy.get("[data-cy=kidNumber]").should(($kid) => {
      const kid = $kid.text();
      expect(kid).to.be.length(8);
    });
  });
});
