@echo off

npm init -y

npm install cypress@9.7.0 --save-dev --save-exact --force cypress-cucumber-preprocessor

npx cypress open