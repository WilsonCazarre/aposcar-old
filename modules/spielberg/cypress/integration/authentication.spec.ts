import { REQUIRED_MESSAGE } from "../support/constants";

describe("Navigates to aposcar then ", () => {
  before(() => {
    cy.visit("/register");
  });
  it("Try to create an user with invalid credentials", () => {
    cy.get("#registerForm").submit().as("form");
    cy.get("input[name='username']")
      .as("usernameInput")
      .parent()
      .parent()
      .contains(REQUIRED_MESSAGE);
    cy.get("input[name='email']").as("emailInput");
    cy.get("input[name='password']").as("passwordInput");
  });
});
