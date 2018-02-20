# App configuration

To hardcore values in code is a bad idea. Generally, literals are used to configure some parts of the application, for example, a url, a route, a code, etc. The main problem is that these values may change in the future because they may depend on the third system as a restfull api or an authentication server. In that case, not changing them is not an option because it will break the application but to pass the whole deployment process (create a new version, pass the test, pass the quality, etc.) to modify a literal value seems exaggerated. For this reason exists the configurations. 

When you are writting a literal in the code, stop and think because, the most probable is that you are doind something wrong. Think about the frecuency that this value can change and if this value has external dependencies. If the value is not going to change very often or it only depends of you and your team you can put it in a constant or in a static value of the class. If the value is going to change really often or it is highly depending of a third system it is better to put it in some configuration file which is loaded by a factory inside a provider. 

 ## Changes made

The most critical values that we have in the app are the url of the Marvel API and the private and public key which we use to identify us in their systems. These values are strong dependents of the Marvel API; if Marvel change the urls or the way an user authenticates in its API our app won't work any more. In consequence, these literal are the perfect candidates to be in an external config file. 

In the assets folder, I have created two json files; the "marvel-endpoints.json" and the "marvel-tokens.json" for the url and the public / private keys, respectively. Each file is consumed by an HTTP request made from a factory that can be found in the files "auth.configuration.ts" and "marvel-api.configuration.ts". The factories return an observable element that contains an object with the values of the configuration files. These objects are referenced by the injection tokens "AUTH_CONFIGURATION" for "marvel-tokens.json" and "MARVEL_API_CONFIGURATION" for "marvel.endpoints.json".

An injection tokens are like empty providers which can be fill with a constant, other provider, a class or, in this case, with the result of a factory. At the end, what we have is a singleton value referenced by a variable which is the injection token. You can learn more about the injection in Angular from the [offical documentation](https://angular.io/guide/dependency-injection) or from [this article of Pascal Pretch](https://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html)

The configuration that relates each token to its factory is done in the "core.module.ts".

We have more literals apart the urls and the keys. We have the limit of the length in the description which is 100 and 50 characters in the search and details components respectively. We also have the limit of the rows in the details tables. All these values are only dependend of the app. For this reason, I added them in a static values in each of their components classes.

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
