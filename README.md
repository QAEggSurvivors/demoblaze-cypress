# Demoblaze Cypress Test Automation 🧪

![Demoblaze Logo](assets/demoblaze-logo.png)

A complete test automation framework for the [Demoblaze](https://www.demoblaze.com/) e-commerce website using Cypress, Cucumber, and Page Object Model pattern.

## 🎯 Project Overview

This project provides automated testing capabilities for the Demoblaze online store, covering core functionalities like:
- User authentication (Login/Signup)
- Product browsing and navigation
- Shopping cart management
- Order placement and purchase flow
- Contact and About Us features

## 🛠️ Tech Stack

- **[Cypress](https://www.cypress.io/)** v9.7.0 - Web testing framework
- **[Cucumber](https://cucumber.io/)** - Behavior-driven development (BDD)
- **[Allure Reports](https://allurereport.org/)** - Beautiful test reporting
- **JavaScript ES6+** - Modern JavaScript features
- **Page Object Model** - Maintainable test architecture

## 📁 Project Structure

```
demoblaze-cypress/
├── cypress/
│   ├── fixtures/          # Test data and locators
│   ├── integration/       # Feature files and step definitions
│   ├── plugins/           # Cypress plugins configuration
│   └── support/
│       ├── commands.js    # Custom Cypress commands
│       ├── index.js       # Global configuration
│       └── pagesObject/   # Page Object classes
├── allure-results/        # Test execution results
├── cypress.json          # Cypress configuration
└── package.json          # Dependencies and scripts
```
---
## 🤝 How to Contribute

### 1. Development Setup
1. Clone the repository
```
git clone https://github.com/QAEggSurvivors/demoblaze-cypress.git
```
2. Create a feature branch: 
```
git branch feature/your-feature-name
git checkout -b feature/your-feature-name
```

3. Follow the existing code patterns and naming conventions

### 2. Code Standards
- **Use English** for all code, comments, and documentation
- **Follow BDD practices** - write readable scenarios in Gherkin
- **Page Object Model** - keep test logic in page classes
- **Use double quotes** (`"`) for strings, single quotes (`'`) internally when needed
- **Meaningful names** - use descriptive method and variable names

### 3. Adding New Tests
1. Create `.feature` file in appropriate `integration/` subfolder
2. Implement step definitions in corresponding `.js` file
3. Add/update page objects in `support/pagesObject/`
4. Update `fixtures/locators.json` for new selectors

### 4. Submitting Changes
1. Ensure all tests pass: `npm test`
2. Generate reports: `npm run allure:generate`
3. Commit with descriptive messages: `git commit -m "feat: add login validation tests"`
4. Push and create a pull request with detailed description

### 5. Pull Request Guidelines
- Describe what functionality was added/changed
- Include test scenarios covered
- Mention if new page objects or fixtures were added
- Attach screenshots of test results if applicable

## 📊 Test Reports

This project uses Allure for beautiful, detailed test reports:
- **Screenshots** on test failures
- **Step-by-step execution** details
- **Test history** and trends
- **Categories** and **tags** for organization

## 🔧 Configuration

Key configuration files:
- `cypress.json` - Base URL, timeouts, viewport settings
- `fixtures/locators.json` - CSS selectors and XPath locators
- `support/index.js` - Global hooks and page object initialization

## 📞 Support

For questions or issues:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include screenshots and error logs when applicable