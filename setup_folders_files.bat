@echo off

mkdir cypress\integration\feature_1
mkdir cypress\integration\feature_2
type nul >> cypress\integration\feature_1\feature_1.js
type nul >> cypress\integration\feature_2\feature_2.js

mkdir cypress\support\pagesObject
cd cypress\support\pagesObject
type nul >> CartPage.js
type nul >> ContactWindow.js
type nul >> HomePage.js
type nul >> LoginWindow.js
type nul >> ProductPage.js
type nul >> PurchaseWindow.js
type nul >> SignupWindow.js


