# Modules and lazy loading

Until now, our small application was a single module in which everything was injected so that we could use it in our two views. It did not matter what resources were needed in the search or in the details; everything was loaded at the start of the application and the application started with all the resources in the browser. Of course, for an application as small as this example, it does not make a big difference to load everything at the beginning, but, in larger applications or in applications more oriented to mobile devices, to load only the resources that we need in each view could mean the difference between a pleasant user experience and a slow, unpleasant and exasperating user experience.

 ## Changes made

So, what I have made in this step is to create two modules, one for each view, to make sure that each web page gets the components, services, pipes, etc.. which needs to work. Nothing less, nothing more. So, for example, the CommonModule, the HttpClientModule and the RouterModule is needed in both but the FormModule, where is the ngModel directive, it is only needed in the search view. Of course each module of each view will also need its respectively component ("DetailComponent" and "HeroesSearchComponent") and its own routes. The definition of the views routes has changed a bit. Now they have an empty string insted the path which pointed them. The reason is that we are creating a subtree of path for each module. It is important for the lazy loading and for the modularity of our app. Now, each module is like a sub app which is inside of our app and, as a sub-app, can have its own routes. For this little example we don't need to define more routes that the default route so, for this reason, the path attributes in the routes is an empty string. The routes of each module are loaded using the method "forChild" of the "RouterModule".

Now we have the two modules for each view with their resources separetad but we are still needind a configuration of path to point which resources the app should bring from the server. This configuration I've written in the file "app.routes.ts". This file matchs the app paths and the modules that should load in the browser for each path. This configuration is set up by the method "forRoot" of the RouterModule in the "app.module" file.

You can find more details about lazy loading with the Angular router in the [router official documentation](https://angular.io/guide/router)


 ## Authors:

 ### Adrian Ferreres:
 Angular developer since beta 17 and technical speaker. He has worked in several IT consulting projects in Spain with the framework and, currently works as frontend developer for Censhare in Munich

 ### Ruben Aguilera:
 Regular technical speaker, Angular and Polymer expert, developer trainers and advanced software architect. Ruben had worked on many projects, as a full stack developer. Currently working in Spain for Autentia and wrote all his lessons learned in the book ["Angular: guía práctica"(only in Spanish... sorry)](https://leanpub.com/angular-guia-practica)

### Alfredo de la Calle:
Angular, React, Polymer, native javascript ..... all-terrain developer. Alfredo has worked in startups and some project of IT consultancies.  Currently, he works at GFT consulting as a front-end developer.
