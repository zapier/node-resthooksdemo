# Node.js RESTHooks Demo
This is a simple proof of concept that demonstrates how to setup rest
hook in a basic <a href="http://sailsjs.org/">sails.js</a> application. While the concept and examples
are simple the same basic concept should be applicable with the
complexities of your application domain. 

## The Layout
This project consists of two servers: the Contactly application that is
the latest startup to attempt to corner the CRM market and a client
application (client_app.js) that represents some application hosted
somewhere else on the internets that someone wants to use to extend the
Contactly application. 

![Contactly](http://i.imgur.com/KCvjSm8.png)
 
## Running It
Running it assumes that you have node.js 0.10 or above instaled. 


```bash
npm install
npm start

```

Visit http://localhost:1337 in a browser to view the web interface. You
can also visit the RESTful API urls at:

http://localhost:1337/contact
http://localhost:1337/subscription

Now from another terminal let's start up the client application that
pretends to be an app that is extending our application via REST Hooks. 

```bash
node client_app.js

```

Now if you visit the subscription endpoint again you should see that
three subscriptions have been created (for create, update and delete). 

```bash
$ curl -L http://localhost:1337/subscription                                                                                                          [17:23:52]
[
  {
    "target": "http://localhost:3000/create",
    "event": "contact.create",
    "createdAt": "2013-08-25T00:23:51.900Z",
    "updatedAt": "2013-08-25T00:23:51.900Z",
    "id": 1
  },
  {
    "target": "http://localhost:3000/update",
    "event": "contact.update",
    "createdAt": "2013-08-25T00:23:51.904Z",
    "updatedAt": "2013-08-25T00:23:51.904Z",
    "id": 2
  },
  {
    "target": "http://localhost:3000/delete",
    "event": "contact.delete",
    "createdAt": "2013-08-25T00:23:51.906Z",
    "updatedAt": "2013-08-25T00:23:51.906Z",
    "id": 3
  }
]
```

The client_app.js hosts its own http server with those three routes and
on start it makes three calls to Contractly to subscribe to the
corresponding events. 

Now go poke around in the application and add a couple contacts. You
should see something like this in the client_app server's console: 

```bash
create                                                                                                                                              [17:23:54]
{ firstName: 'Jeffery',
  lastName: 'Lebowski',
  phoneNumber: '111-222-3333',
  emailAddress: 'jeffery@example.com',
  createdAt: '2013-08-25T00:29:20.482Z',
  updatedAt: '2013-08-25T00:29:20.482Z',
  id: 1 }

```

### Cleaning Up
Finally, the client application has a route that basically says "Okay,
I'm done. Don't let me know of anymore contact updates!". 

```bash
$ curl -L http://localhost:3000/remove-subscriptions                                                                                                  [17:31:30]
```

Of which the console for the client application will display: 

```bash
deleting subscription 1
deleting subscription 2
deleting subscription 3
```

Now if you view the subscriptions in the service you'll see that no more
subscriptions are active. 

```bash
$ curl -L http://localhost:1337/subscription                                                                                                          [17:31:49]
[]

```

And of course, poking around in the application at http://localhost:1337
we'll notice there is no longer any chatter in the console for the
client application. 


## How We Do It

## What You Should Do In Production
Obviously we cut a lot of corners in this demo to be very brief and to
the point. For a production quality application it is recommended that
you try to implement the following pieces.

- Use proper validation and application security techniques
- Implement a form of authentication (whether OAuth2, basic auth or API
keys) to secure services exposed via REST hooks.
- Limit the scope of what objects external services can subscribe to
that are within their domain. 

Also, while simply pushing notifications out asynchronously as we do in
these examples, for a site with a heavy volume of traffic you may want
to consider pushing model updates into a queue to a separate application
to send the notifications out to subscribers. <a href="https://github.com/postwait/node-amqp">AMQP</a>, <a
href="https://github.com/pietern/hiredis-node">Redis</a> or even the
queue-less <a href="https://github.com/JustinTulloss/zeromq.node">ZeroMQ</a> are all valid options here. 
