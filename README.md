# Workshop of good practices in Angular

This workshop tries to teach which are the best practices to codify an application in Angular and why it is so important to follow them. To do so, we take this application as example.

This app is an small web to search inforamtion about Marvel comics characters. It has two pages;

 1- A search page to look for a character
 
 2- A page with all the details of the character

 This application is a clear example of how nobody has to codify an application in Angular. Despite the fact that it was created with Angular-cli,that it does not have any error of lint and works well (do not pay too much attention to the css files ...) everything is wrong. This application has serious problems of maintainability. It is difficult to read, it mixes several languages in a single file, it mixes logic of visualization with logic of model, it is not modular, it is not lazy so its performance is bad, etc. 

 During this workshop I'm going to do refactoring step by step to change it in the right way. In each step I'll improve one part of the app and I'll explain which are good practices I've followed, why they improve the app and what benefits we get. 

The main objective of this workshop is to understand the reason of these good practices. I am quite sure that all what I'm going to teach in this workshop is well know for the majority of the angular developers. Althought this fact, I'm still finding examples of bad practices in Angular projects. I think that the main reason of it is that the people don't understand the why of these good practices. This workshop is going to explain point by point all these rules.

 ## How to follow this workshop

This is the first step of the workshop. It is mark with the git tag "step-0". To go to the second step you should pull the tag "step-1" from the github repository. The same for the second, third, fourth and so on consecutively for the rest of the steps. In each step the README file is different. It will explain the good practice which is applied in the code of the git node. To see how the code change with each good practice you need only to make a 'git diff' between two different steps.

 ## Authors:

 ### Adrian Ferreres:
 Angular developer since beta 17 and technical speaker. He has worked in several IT consulting projects in Spain with the framework and, currently works as frontend developer for Censhare in Munich

 ### Ruben Aguilera:
 Regular technical speaker, Angular and Polymer expert, developer trainers and advanced software architect. Ruben had worked on many projects, as a full stack developer. Currently working in Spain for Autentia and wrote all his lessons learned in the book ["Angular: guía práctica"(only in Spanish... sorry)](https://leanpub.com/angular-guia-practica)

### Alfredo de la Calle:
Angular, React, Polymer, native javascript ..... all-terrain developer. Alfredo has worked in startups and some project of IT consultancies.  Currently, he works at GFT consulting as a front-end developer.
