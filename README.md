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

## Getting Started

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
API keys, etc. The template provided at 
