# App configuration

To hardcore values in code is a bad idea. Generally, literals are used to configure some parts of the application, for example, a url, a route, a code, etc. The main problem is that these values may change in the future because they may depend on the third system as a restfull api or an authentication server. In that case, not changing them is not an option because it will break the application but to pass the whole deployment process (create a new version, pass the test, pass the quality, etc.) to modify a literal value seems exaggerated. For this reason exists the configurations. 

When you are writting a literal in the code, stop and think because, the most probable is that you are doind something wrong. Think about the frecuency that this value can change and if this value has external dependencies. If the value is not going to change very often or it only depends of you and your team you can put it in a constant or in a static value of the class. If the value is going to change really often or it is highly depending of a third system it is better to put it in some configuration file which is loaded by a factory inside a provider. 

 ## Changes made

The most critical values that we have in the app are the url of the Marvel API and the private and public key which we use to identify us in the Marvel systems 

 ## Authors:

 ### Adrian Ferreres:
 Angular developer since beta 17 and technical speaker. He has worked in several IT consulting projects in Spain with the framework and, currently works as frontend developer for Censhare in Munich

 ### Ruben Aguilera:
 Regular technical speaker, Angular and Polymer expert, developer trainers and advanced software architect. Ruben had worked on many projects, as a full stack developer. Currently working in Spain for Autentia and wrote all his lessons learned in the book ["Angular: guía práctica"(only in Spanish... sorry)](https://leanpub.com/angular-guia-practica)

### Alfredo de la Calle:
Angular, React, Polymer, native javascript ..... all-terrain developer. Alfredo has worked in startups and some project of IT consultancies.  Currently, he works at GFT consulting as a front-end developer.
