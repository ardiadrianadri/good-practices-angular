# Documentation

The advantages of the comments in the code are well known by most of the developers. For newcomers, they help to understand the solution and, for you, help you understand why you coded that solution (usually, it follows a sense of shame). Despite this, it is common to find the code without comments or comments that are difficult to understand. It is because developers do not like to write documentation, they like to think that their own code is sufficient to explain what is happening in the application, or because the methodology for writing comments is not clear. However, since the release of living documentation tools, those excuses are no longer true. 

The Living documentation tools, such as "Compodoc" or "JSDocs", are tools to generate documentation through the comments of the code. Scan the code looking for some specific headings of comments like this one:

```
/**
 * Component to display the loading message when the app is waiting for new data
 *
 * @export
 * @class LoadingComponent
 */

```
These headings have their own language that indicates:
* If the following line is a class, function, interface, attribute or method
* In the case of a method or a function if it has input parameters and what type. It also indicates the type of return
* Shows if the item belongs to a class or not, if it is public or private, if it has a predetermined value, etc.

These headers can also be complemented by the developer (one or two lines, no more) and they have to be placed just before the declaration of the element which we want to document.

Living documentation tools provide a clear language and methodology for writing comments in the code that reduce the time and effort required to write the documentation. Even if we are not going to scan the code to generate the documentation, it is worth writing these headers because code / IDE editors use them to provide information about the libraries / classes / functions that we are using in our developments.

You can find information about living documentation tools in the next links:

* [Compodoc](https://compodoc.github.io/website/guides/getting-started.html)
* [JSDoc](http://usejsdoc.org/)

So no more excuses and start to write comments.
 ## Changes made

This time the changes are easy. I wrote down all the living documentation headings of Compodoc before each declaration of classes, method, attribute and function that the application has. To do so, I used the "Document this" plugin from Visual Studio Code. Typically, each editor / IDE has its own snippet / plugin to help write the headers of the live documentation. My advice is that you look for it and use it.

## How to run the example
This example use the public Marvel API as a backend data source. To use it you need to have a Marvel public and private key. To get them is easy; go to [the developers portal](https://developer.marvel.com/), create an account and copy your key from your [account information page](https://developer.marvel.com/account). After that, look for in the code where the keys are needed:
```
marvelPublicKey: '<Your public key from marvel account>',
marvelPrivateKey: '<Your private key from marvel account>'
```
And replace the strings "<Your public key from marvel account>" and "<Your private key from marvel account>" for your public and private key respectively.

**Important: do not push in the github repository your private key**

 ## Authors:

 ### Adrian Ferreres:
 Angular developer since beta 17 and technical speaker. He has worked in several IT consulting projects in Spain with the framework and, currently works as frontend developer for Censhare in Munich

 ### Ruben Aguilera:
 Regular technical speaker, Angular and Polymer expert, developer trainers and advanced software architect. Ruben had worked on many projects, as a full stack developer. Currently working in Spain for Autentia and wrote all his lessons learned in the book ["Angular: guía práctica"(only in Spanish... sorry)](https://leanpub.com/angular-guia-practica)

### Alfredo de la Calle:
Angular, React, Polymer, native javascript ..... all-terrain developer. Alfredo has worked in startups and some project of IT consultancies.  Currently, he works at GFT consulting as a front-end developer.

### Oleksandr Fedotov:
Full-stack developer, with a special passion for front-end development. Big fan of Javascript and functional programming. At the moment working as an IT Consultant at Netlight in Munich.
