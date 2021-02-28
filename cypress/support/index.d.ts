/// <reference types="cypress" />

declare namespace Cypress {
  export interface Chainable {
    getState(): Chainable<Element>;
    pickRecurring(recurring: boolean): Chainable<Element>;
    pickMethod(methodName: string): Chainable<Element>;
    pickAnonymous(): Chainable<Element>;
    inputDonorValues(): Chainable<Element>;
  }
}
