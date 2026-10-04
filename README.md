# Cypress Automation Portfolio

This repository demonstrates my approach to web test automation using **Cypress and JavaScript**.

The project focuses on automating meaningful user journeys and regression scenarios rather than maximizing the number of automated tests. The current implementation uses **SauceDemo**, a demo e-commerce application, to validate authentication, product catalogue behavior, shopping cart functionality, checkout flows and business critical data consistency.

The automation suite includes both stable regression coverage and an isolated known-issue scenario demonstrating how automated checks can detect a real customer-facing inconsistency.

For an overview of my broader QA experience and portfolio:

[View Main QA Portfolio](https://github.com/DavihBlack/qa-portfolio)

---

## Project Objectives

This project demonstrates:

- End-to-end web automation with Cypress
- Automation of critical user journeys
- Positive and negative scenario coverage
- Risk-based selection of automation candidates
- Reusable Cypress commands
- Centralized test data using fixtures
- Independent and repeatable automated tests
- Business-critical validation such as pricing and checkout totals
- Detection of existing application defects
- Headless regression execution

---

## Tech Stack

| Area | Technology |
|---|---|
| Test Automation | Cypress |
| Programming | JavaScript |
| Runtime | Node.js |
| Package Management | npm |
| Browser | Google Chrome |
| Development | Visual Studio Code |
| Version Control | Git / GitHub |

---

## Application Under Test

### SauceDemo

SauceDemo is used as the application under test because it provides realistic e-commerce workflows including:

- Authentication
- Product catalogue
- Product detail pages
- Shopping cart
- Checkout
- Different user states and application behaviors

---

## Automated Test Coverage

### Authentication

The authentication suite validates:

- Login page availability
- Successful login with valid credentials
- Invalid credentials
- Locked-out user behavior
- Required username validation
- Required password validation

### Product Catalogue

The product suite validates:

- Product inventory availability
- Expected number of products
- Product information completeness
- Product name and price consistency between PLP and PDP
- Price sorting from low to high

### Shopping Cart

The cart suite validates:

- Adding a product to the cart
- Shopping cart badge updates
- Correct product information inside the cart
- Removing products from the cart
- Empty cart state after removal
- Adding multiple products
- Correct cart quantity and product state

### Checkout

The checkout suite validates:

- Complete end-to-end checkout flow
- Checkout customer information
- Product consistency during checkout
- Product price
- Subtotal
- Tax
- Final total
- Successful order completion
- Required First Name validation
- Required Last Name validation
- Required Postal Code validation

---

## Known Issue Detection

A separate test suite demonstrates how automation can identify an existing application defect without affecting the main regression suite.

The scenario uses SauceDemo's `visual_user` and validates product price consistency between the Product Listing Page and Product Detail Page.

The automated check:

1. Logs in using `visual_user`
2. Captures the product price displayed on the PLP
3. Opens the corresponding PDP
4. Compares the PDP price with the previously captured PLP price
5. Reports a failure when the values do not match

The failure is **intentional and isolated from the regression suite**.

Its purpose is to demonstrate that an automated check should not only verify expected flows, but also detect customer facing inconsistencies when the application behavior is incorrect.

---

## Project Structure

```text
cypress-automation-portfolio/
│
├── cypress/
│   ├── e2e/
│   │   └── saucedemo/
│   │       ├── known-issues/
│   │       │   └── visual-user.cy.js
│   │       ├── cart.cy.js
│   │       ├── checkout.cy.js
│   │       ├── login.cy.js
│   │       └── products.cy.js
│   │
│   ├── fixtures/
│   │   ├── checkout.json
│   │   └── users.json
│   │
│   └── support/
│       ├── commands.js
│       └── e2e.js
│
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md

```

---

## Reusable Test Design

Repeated actions are abstracted where doing so improves maintainability without hiding important test behavior.

For example, authentication is implemented as a reusable Cypress custom command:

```javascript
cy.login(username, password)
```

This keeps authentication visible as part of the test flow while avoiding unnecessary duplication across product, cart, and checkout suites.

Test data is maintained separately using Cypress fixtures, including:

- Valid users
- Invalid users
- Locked-out user
- Visual user
- Checkout customer data

This keeps test logic separate from test data and makes the suite easier to maintain and extend.

---

## Running the Project

### Prerequisites

Ensure the following are installed:

- Node.js
- npm
- Google Chrome

Clone the repository and install dependencies:

```bash
npm install
```

### Open Cypress

```bash
npm run cy:open
```

Opens the Cypress Test Runner for interactive execution.

### Run Regression Suite

```bash
npm run cy:run:regression
```

Runs the main regression suite in Chrome using headless execution.

The regression suite includes:

- Login
- Products
- Cart
- Checkout

All regression tests are expected to pass.

### Run Known Issue Demonstration

```bash
npm run cy:run:known-issue
```

Runs the isolated `visual_user` scenario.

The test is expected to fail while the known PLP/PDP price inconsistency exists.

### Run All Specs

```bash
npm run cy:run
```

Runs all Cypress specs.

> The full execution also includes the isolated known-issue scenario and will therefore report its intentional failure while the application defect remains present.

---

## Automation Approach

Automation candidates are selected based on the value they provide during repeated regression testing.

Priority is given to critical customer journeys, business sensitive behavior and scenarios where fast, repeatable feedback provides clear value.

Current coverage focuses particularly on:

- Authentication
- Product data consistency
- Shopping cart state
- Checkout
- Pricing and totals
- Required field validation
- Positive and negative regression scenarios

The objective is not to automate every possible interaction. The focus is on maintainable coverage of areas where regressions could have a meaningful impact on the user or the business.

---

## Current Status

Implemented:

- Cypress environment configuration
- End-to-end automation
- Positive scenarios
- Negative scenarios
- Reusable authentication command
- Centralized test data using fixtures
- Headless regression execution
- Isolated known-issue detection

Planned:

- CI/CD integration
- Automated execution reporting
- Additional browser execution where valuable
- Extended regression coverage where justified

---

## Related Portfolio Projects

### Main QA Portfolio

Central overview of my QA experience, testing approach, skills, services and portfolio projects.

[View Main QA Portfolio](https://github.com/DavihBlack/qa-portfolio)

### Manual Testing Portfolio

Manual QA projects covering test planning, risk analysis, test cycles, test case design, execution reporting, defect reporting and supporting evidence.

[View Manual Testing Portfolio](https://github.com/DavihBlack/manual-qa-portfolio)