# Model logic away from the view logic

The different types of logic are like different types of alcoholic beverages; You can mix them, but you should know that it will not be pleasant the next day. In previous versions of our example, the components not only represented the view. They calculated the authorization parameters, created the url, requested the data, modified the data to adapt it to the needs of the view ... they are many things only for a visualization component. Now imagine that the Marvel API made a broken change in its interfaces, we would have to make changes in both views and we are lucky that we only have two views. In an application with twenty or more front components, the cost in money and time would be really high.

In order to avoid that problem we have to keep separeted the view logic from the model logic using providers. The providers are singleton object that can be injected in several components to carry out the processes which are not part of the front component. The component have only to render the template and collect the actions of the user. Nothing more. As a consequence of these actions a method of a provider will be run and its result will be collected by the component to update the view. End of the story. If you thing that this way to work it makes the components to much simples it is because we want simples components. There is nothing bad to have simples clases; they are easy to test and easy to evolve. 

 ## Changes made

A lot of changes this time. The main change is that I removed the authorization and http request logic from the components and I put them in the "auth.service.ts" and "marvel-api.service.ts" respectively. I could put both processes in one provider but I want classes as simple as possible. The two providers are injected in a new module call it "core.module.ts". The reason is that the "marvel-api.service.ts" is needed in both components, so it can not be injected only in one of the two modules... it would be weird.
Think about it, as I explained earlier, the providers are singleton classes. That means that it does not matter how many modules is injected; it will only be an instance of each provider. The way it works is that the last provider injected overwrite the previous one. It is not a big deal if your provider does not have state, but if it have it, it will be the cause of several strange behaviors in the application. As you know, we are using the lazy loading, which means that the modules are loaded into the browser as soon as the application needs them. If a second module is loaded with a second injection from a provider in the middle of a running application, all the information that the instance has will be deleted. It's like resetting the provider; start from 0. So, to solve that problem, we must make sure that each provider is injected once and only once. In our case, we could inject it in the search module ... or in the details module, but:

1- The module where we inject it can not be reused in other places of the application
2- It does not make sense for a provider to be used in two modules, only one of them is injected. It makes it difficult to understand how the application works

So, in conclusion, the main module is the module where we are going to inject all the suppliers that are used in two or more components. The module of the application will be injected into the main module, so that the suppliers can be accessed from all the elements of the application. The central module must guarantee that it is injected once. For this reason, it will inject, in the constructor, an instance of itself with the decorators "SkipSelf" and "Optional". The decorator "SkipSelf" avoids the injection of the constructor's class and the "Optional" is to declare that the injection is not necessary to create the module. In this case, if the constructor obtains an instance of the core module within its constructor, it is because there was a previous injection of itself. If this happens, the constructor will throw an unhandled exception to stop the boostrap of the application.

Other things that can get your attention is that there is no mention of table pages in the "marvel-api.service.ts", in fact, the object returned by the methods is a new type, call it MarvelAnswer which has information unneeded information for our components like " total". "," offset "," count ", etc. The reason for this is because mixing the logic of the model with the logic of the view is as bad as mixing the logic of the view with the logic of the model. Concepts such as pages are part of the tables. If we use them in the providres, we will accomodate the service with the component Our service will only be useful for tables and nothing else. Imagine that we want to implement a list of Marvel characters with infinite scroll, in that case, we do not have paginated tables, but we still need the offset, limit and total values ​​to implement this component. Providers must give the components the necessary information to render the view, but not the value of the view concepts. 

To end I will like to point that, now, the "marvel-elements" interface is also needed in the providers files so I've moved it in the common folder and the HttpClient is not more needed in the components so its module has been remove from the "search.module.ts" and "details.module.ts".

**Note**:
One more note. In these changes there was a side effect that I did not expect. I have created a filter in "marvel-api.service.ts" that removes the values without information that I get from the Marvel API (There are some, believe me). This improvement did not exist in the previous versions for a simple reason; too much stuff in my head at the same time. When I separated the logics, my mind focused on what I needed to get the data alone and I realized that I lacked a method to eliminate the blank data. Another advantage is to make more specific classes; the resulting code is more robust because you only focus on one requirement at a time. It happens even in the most expert developers ;)

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
