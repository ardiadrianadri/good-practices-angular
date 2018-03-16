# Templates separated from the code

This rule is easy. Never mix HTML and CSS templates with the typescript code. The reasons are:

1- **Easier to read**: The only way to hardcore the templates in the Angular components is by a string. That means the editors/ IDEs can not use any color code, check the tags closed and grammar check on those templates because they interpret them as a plain text. For a developer, it makes harder to read and harder to search for errors without the help of the editors/ IDEs plugins (in fact the CSS templates in the previous step had an error which I couldn't see until I moved the templates to CSS files)

2- **Better organization of the code**: It is now possible to change the view without touching the TypeScript file. In the event that we have a team with a web design expert, I'm quite sure that he will be grateful to be able to change the HTML and CSS templates without touching the Typescript files.

## Changes made

I've created two folders; details for the templates of the details web page and search for the ones on the search web page. All the files have the word "component" between the file name and the extension to make clear that these files belong to an Angular component. After that, I moved the HTML and CSS code to their respective files and I changed the hardcore templates inside the components by the path to the files.

**Advice**: 
It is not a good idea to make a deep folder tree in the project. Usually, the people like to make a lot of folders to improve the organization of the code but this brings others problems. A workspace with a lot of deeps paths it makes harder to find the files for new comers in the project and it makes easier to have errors in the relative paths. The best, in my opinion, is to have only one level under the app folder.  

## How to run the example

This example uses the public Marvel API as a backend data source. To use it you need to have a Marvel public and private key. To get them is easy; go to [the developers portal](https://developer.marvel.com/), create an account and copy your key from your [account information page](https://developer.marvel.com/account). After that, look for in the code where the keys are needed:

```
marvelPublicKey: '<Your public key from marvel account>',
marvelPrivateKey: '<Your private key from marvel account>'
```

And replace the strings "<Your public key from marvel account>" and "<Your private key from marvel account>" for your public and private key respectively.

**Important: do not push in the Github repository your private key**

## Authors:

### Adrian Ferreres:

Angular developer since beta 17 and technical speaker. He has worked in several IT consulting projects in Spain with the framework and, currently works as frontend developer for Censhare in Munich

### Ruben Aguilera:

Regular technical speaker, Angular and Polymer expert, developer trainers and advanced software architect. Ruben had worked on many projects, as a full stack developer. Currently working in Spain for Autentia and wrote all his lessons learned in the book ["Angular: guía práctica"(only in Spanish... sorry)](https://leanpub.com/angular-guia-practica)

### Alfredo de la Calle:

Angular, React, Polymer, native javascript ..... all-terrain developer. Alfredo has worked in startups and some project of IT consultancies.  Currently, he works at GFT consulting as a front-end developer.

### Oleksandr Fedotov:

Full-stack developer, with a special passion for front-end development. Big fan of Javascript and functional programming. At the moment working as an IT Consultant at Netlight in Munich.
