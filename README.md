reaction-paymentmethod
=============

A non-processing payment method for ReactionCommerce that is meant to be a template for developing new payment methods and as a default
payment method for testing

# Introduction

Payment methods are one of the most common packages that developers need to 
create, especially when migrating from another platform. This package and 
documentation was created to try and make this process as easy as possible 
for developers new to Reaction. Also to aid in making all payment methods 
as consistent as possible so that they are usable by the largest number of users.

### Getting Started

The first task is to choose a simple, single-word indentifer for your payment
method. You will use this over and over and having it simple and consistent
will make it less easier to keep your package free of bugs. In this project we
have chosen the clever name of `generic`.

## The Client Side

There are two basic elements that must be created, the payment forms and the 
dashboard. Like all Meteor projects you place all your client code in the
`client` directory.

### Checkout

In this project the payment form is implemented in `templates/cart/checkout/payment/methods/generic`.
The HTML template is just a standard Credit Card entry form with standard validation. You probably
will want to look at the code in `Autoform.hooks` because here is where
the `authorize` function is called. You may want to change how some elements
such as `storedCard` are implemented based on your needs, although the default
will probably work for most people. You have to change all the references to `generic` or
`GenericPayment` to whatever your payment method is called. Most importantly
in the section where the `paymentMethod` object is created to be stored in the db
you must change the `processor` and `method` values. _(This should probably be changed
in the future to derive this value from the package)_

### Dashboard

It is likely that your payment method has some parameters that need to be customized
and should not be stored in code. Typically this includes usernames, passwords,
API keys, etc. The template provided at `template/settings` provides a form for entering in
this information. The provided form just takes one parameter, an API key (which of course 
is not needed or used). You can add any additional parameters required here.

![](/screenshot_settings.png "Dashboard Settings Screen")

## Server-side

### Collections

In `common/collections` you will want to change the PackageConfig schema to include any settings
you added to the dashboard form. In addition you will want to modify the `ReactionCore.Schemas.GenericPayment`
schema to have your own name and modify which values you capture (for most Credit Card methods you can
probably leave it the same).

If you are unfamiliar with how Schemas work, you can look at
other examples throught the Reaction project or visit https://atmospherejs.com/aldeed/simple-schema
and view the documentation there.

### Routing

If you method is a typical server-side method, you should not need to add any additional routes, just modify the
existing route for the dashboard to reflect the name of your package.

### Lib

In the lib directory you need to modify/implement the methods provided here. In this file mostly what you are doing
is just providing a way for the client to call the server side methods. If you method does not require any parameters
you may not need the `accountOptions` method but most payment methods should implement `authorize`, `capture`, `refund`,
and `refunds`.

 * **authorize**
 
 Most credit-card processors have a two-step process to allow for different payment models. You should read your merchant
 agreement and the documentation to get the specifics but typically the **authorize** stage will do a check of the
 customer's payment method (credit or debit card) and allocate that amount to you **but no funds have been transferred**.
 To the consumer it looks like the charge has already gone through and their balance is reduced by the allocated amount.
 Typically an autorization will expire after a set number of days. Usually you cannot capture more than you authorize
 but you can capture less and leave the balance still captured or release the balance. In a typical hard-goods shipment
 scenario an authorize will be performed at time of order then when the actual good are shipped a capture is performed.
 
 * **capture**
 
 As noted before, this will operate against a previously performed authorization and tell the payment processor to
 transfer the actual funds. Some payment processors allow you to authorize and capture in one step which is why
 the `authorize` method takes a `transactionType` parameter.
 
 * **refund**
 
 This method is probably self-explanatory, and is just a wrapper for whatever method your payment provider has for
 processing refunds.
 
 * **refunds**
 
 This method should query for a list of refunds and these refunds will show up in the dashboard when managing orders.
 
### Server methods (in the `server` directory)
 
Here you need to provide the server-side implementations of the four methods listed above. The naming is a little
different in that each method must have the name of the provider (the one you selected above) in the method name.
Authorize is a little different in that it is called "Submit", so it's name would be "yourProviderSubmmit". The rest
of the method names are just "yourProvider/methodname". The code should be pretty self-explanatory here.
 
The tricky part is making sure that the necessary data is return in the `results`. Each step except for `authorize`
relies on data saved from the step before so you need to make sure the correct data is there. For example a capture
may require the token of the authorization done before it. This varies a lot from provider to provider so this is
where you will probably spend the most time testing/developing. But if the docs and API are good you should be able
implement this fairly easily.
 
## Your package Registry
 
Payment packages, like all Reaction packages must tell Reaction what they are providing to Reaction through the 
`provides` keyword. Most payment methods will "provide" three things: A dashboard widget, dashboard settings, and a
checkout form (all covered above). Typically you can just change the names in `register.js` to reflect your package
name and you should be fine. Also you need to define any "Global" objects that the payment method should provide.
In the example we export the "GenericAPI" object which is a stand-in for whatever third-party package you may be using
to integrate with your payment processor.
 
## Your Package
 
Like any Meteor package you need to modify the `package.js` at the root of the package to reflect your renamed/created
files.

## Writing Tests

Writing tests for code that is just a wrapper around third-party code is problematic. You don't want to test your
providers code, but you want meaningful tests. 

The solution that we at Reaction Commerce have come up with is to create a wrapper around the third-party code. While
this adds a little more complexity it allows you to seamlessly stub/mock out this library so that you aren't testing
code that you have no control over and it prevents your test code from making calls out to a third party service every
time you run your test. These tests won't take the place of actually testing your code from end to end (i.e. trying
to purchase something in the store and pay for it with your payment method), but it will allow you to quickly see
any problems you create as your code changes.

Check out the example tests and the example wrapper we created. This wrapper uses the 
["Advanced Method boilerplate"](http://guide.meteor.com/methods.html#advanced-boilerplate) which was designed with testing 
in mind by the Meteor folks so that specific features of a larger method could be tested without testing the entire method.

### What to test

My rule of thumb is at least two tests for each method or chunk of code. One for the "happy path"  (when everything
works as expected) and one for if something goes wrong (usually that bad parameters are passed). 
With third party libraries you may want to test that error messages are propogated properly if an error is 
returned by the library.

This rule gives you a starting point, but you should add tests whereever you see a section that is vulnerable to
bugs or whenever you find a bug, write a test that simulates the bug and fix your code until the test passes. Having
this test helps you prevent a regression down the line if another change re-introduces it.
