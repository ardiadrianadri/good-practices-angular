# Immutable views

Our table example is really simple, it has only two events, the request data event that is used each time the table needs a new page, and the click event that is executed when the user clicks on a row. However, it is not usual to have such a simple table. In general, the table has sort events, drag and drop, scroll, etc. If we remain in the two-way data bind pattern, it means that we must have an attribute "@Output" for each of these events. To make it clearer, a component that shares five events needs five output attributes, which means that, in the template, it must have five more html attributes and each of them must match the implementation of a public method in the component father. It could be a bit difficult to maintain.

The two-way data binding has another inconvenient. The view should be updated each time one of the component's inputs changes. Angular achieves that with ZoneJS. There are several articles that explain what is ZoneJS and how it works. Here they are some:

* [Understanding Zones](https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html)
* [Zones in Angular 2](https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)
* [Using Zones for better performance](https://blog.thoughtram.io/angular/2017/02/21/using-zones-in-angular-for-better-performance.html)

Zones is a good way to detect changes in views. In fact, it is really quick if we compare it with our old friend; the digest cycle of AnguarJS, but it has a cost. For a small application like this, being aware of the performance in detecting changes is not worth it, but if we want our application to work well on mobile devices, it is something we have to consider.

The solution to both problems is to leave the two-way data binding to implement a one sense state update. The first step is easy, we just change the change detection strategy of our components to be "onPush". It is a configuration parameter that can be set in the "@Component"'s input. Doing this we are telling at Zones that it is not necessary to worry about the changes in the view. Our views are immutable and they are not going to change anymore. Of course, it is a lie. We need to update the views because, in another way, it will be impossible to update the results in the tables but we want that Zones leave our components in peace to improve the performance of our app.

The second step is to define a set of actions that the user can do in our component. The idea is that each time the user makes an action in our view, the component will launch an event with the action's information. The information will be received by the parent component that will perform this action and update the status of the view. Once the status is updated, the component will obtain the new status and update the view. To update the view, even with the zones deactivated, we will use Observables. The Observables can emit events by themselves, they do not need Angular to do so. The great advantages of Observables vs. Zones are that the Zones are patching all the events, those that we need and those that do not. The observables will launch the events which we want and only when we want. 

I am sure that more experienced developers have already associated this idea with the redux architecture. In fact, it is a way to implement the redux architecture but the store is not a service, it is an attribute of the parent component. The redux architecture is a good idea but it has a problem; the boilerplate. I mean, in our case, if I was following the implementation of the redux step by step, I would have to code a service for the store, a service for the reducers, link the store with the reducers, inject the store into the components and link the service marvel-api with the store. It's too much for just a small table. Of course, the redux architecture has its use case. If you have an application where you must manage the status of several components that, in addition, depend on each other, there is no doubt; You have to implement all the redux. However, to manage the state of an isolated component like ours, this small implementation is more than enough. The important part here is that there is only one way to change the view and the view is only updated once its status has changed.

You can find a deep explanation about [the change detection in Angular in this article](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)


 ## Changes made

Two more interfaces, the TableActions and the TableTypeActions. The first one is the object that will be launched with the actions events in the table and the second one is an enumeration of what actions the users can do on the table. 

The following changes are on the table. I removed all the attributes "@Output" and left only one, "emitAction". This event will carry out all the action on the table. Think for a moment what it means. It means that adding or deleting a new action does not change the interfaces of the component. It makes our table more resistant to breaking changes. It also means that possible actions on the table are listed in the same place, which is easier to change and read. Makes the code more sustainable.

About the entries, the configuration of the table is not a problem because it does not change in the view. What changes is the data entry. For that reason, I modified the input type from "TableData" to "BehaviorSubject <TableData>". The "BehaviorSubject" is a "Subject" with initial status. It will be our redux store. The "Subjects" are "Observables" that can subscribe and emit events with the same object. It does not affect the way in which the table deals with its entries because of the "async" pipe. The "async" pipe obtains an Observable as input and returns the result of the subscription, so that, for the table, it still receives a TableData object. The "async" pipe is also responsible for removing the subscription once the event ends, which protects our applications from memory leak problems related to Observables. You can find more information about the "asynchronous pipeline" in the [official documentation of Angular](https://angular.io/api/common/AsyncPipe)

The last modification is in the configuration of the detection of changes in the components. I changed it from default to "onPush". With this last change, I have made all the views of our components immutable. For the title and loading components, it does not make any difference because they don't change during the lifecycle of the component. For the table, it is not a problem either because I have already made all the changes to implement our own change events.

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
