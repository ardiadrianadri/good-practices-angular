# Shared components

Here is another typical construction in Angular applications; the shared module. The shared module is the module where we are going to inject all the components that are used in two or more modules. The goal is to have a single entry point for the components that are reusable in the application. In that way, we can avoid cyclic dependency problems. Summarizing; all the modules inject the shared module and all the components that were made to be reused are injected into the shared module.

In our example, we have several solutions for a particular case or, in other words, we have several solutions for the same problem. You can verify it with the title, the loading and, the table. The table could be the most obvious of the three because it is something with some complexity that I repeat three times with all its associated logic (paging, page size, selection, etc.). It is clear that I was able to save a lot of time if, in a first time, I had created a general solution for the table. The other two solutions maybe are not so obvious because they are really simple components and repeating them does not take that long. 

Well, there are several points to keep in mind here. The first is that we do not mind having simple components because, as I said in the previous steps, the simple components are easy to test and easy to develop, so the simpler our components are the better. The second point is that all of our components must share the same appearance so, when it changes, the whole app must change in the same way. If there is a portion of HTML that is repeated several times in our application, it is a good idea to move it to its own component to facilitate the updating of all parts of the application. And the third and most important is that we can not code thinking only at the current time. An application is something in continuous change. What is simple now can become complex next week, so to have all the code repeated in reusable components that solve the problem will save a lot of development time in the future because, in that situation, we will only have to modify one thing in only one place. 

## Changes made

Here it appears another typical construction in the Angular app; the share module. The share module is the module where we are going to inject all the components that are used in two or more modules. The objective is to have a unique point of entry for the components that are reusable in the app. In that way, we can avoid problems of cycle dependencies. So in the end, all modules inject the share module and all components which were made to be reused are injected in the share module. 

New interfaces have appeared. The "BaseElement" is the definition of the minimum object that the table needs to work. The table requires that the objects which are displayed in the rows have, at least, an attribute id that is used to identify the object when the "click" event in a row is activated. Another new interface is the "TableConfiguration" that defines the columns of the table, the select options with the size of the pages and the default page size. In the columns, there are two attributes; the title and the field. The first is the string represented in the column header and the second is the attribute shown in that column. And that's how I made the table completely independent of any data set.

Think about we were talking before, think about to solve the problem, not the case. It is not the concern of the table if its rows contain heroes, comics or series; it should be able to contain any type of data. Of course, we need a minimum of information, that is the reason for the "BaseElement" definition. The table only accepts "BaseElement" objects so, any data which wants to be on the table have to extend it which oblige at the objects to have an id field. The rest of the fields do not matter because the "TableConfiguration" interface is which defines the match between the columns and the others attributes. Other advantages of that practice are that if the table changes and, in the future, it needs different data, we only need to change the "BaseElement" interface. Doing that, the modification is spread for all the different objects related to the table without the need to do anything more.

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
