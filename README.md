# One element per file

As you saw, it is possible to create a complete application in a file with Angular, but it is generally not recommended. The reason is easy, all the code in a file is difficult to understand and evolve. Our current website is small, it has only two web pages, but imagine that we had to add 15 more pages. If we want to keep everything in a file, it would mean adding hundreds of lines of code that will make the code really hard to understand. In the current version, the code that runs on the search web page is separated from the details code, so when we are changing a file, we know exactly what functionality of which page we are touching. If everything is in the same file, the likelihood of someone confusing one class with another and making changes in the wrong place is quite high. Not separating the code into files by functionality multiplies the probability of errors.

 ## Changes made

In this case I've separeted the two components in two files; the "search.component" and the "details.component". The declaration of the interfaces were moved in their own files, too. The "auth-token" and the "hero" interfaces are used in both components so I've created a "common" folder for the common code and I put them there. The "marvel-elements" interface is only used in the details component so I leave it in the details folder.

The other files, the "details.router.ts" and the "search.router.ts" are the router routes for the details web page and the search web page, respectively. The reason for separating the list of routes into two files is the same as that for the components and interfaces; to keep a file by functionality. In addition, having separate files for the routes gives us other advantages ... but they will be explained in the next step.

**Note**:
There are people who likes to put all the types and interfaces definitions in one single file per component. As the interfaces and types are only declaration and it doesn't have any logic I think that it is fine do it in that way. However, It is better to abuse this rule than to fall short in its use. In the doubt of whether to separate code or not, separate. It is for this reason that I decide to separate each definition in its own file

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
