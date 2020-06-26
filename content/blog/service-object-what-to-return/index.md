---
title: 'Service Objects: What To Return?'
date: "2020-06-25T07:00:00.000Z"
description: "I've seen a lot of approaches to returning data from a service object, but there are 2 that stick out."
---

There's the classic Rails/Ruby problem of "where should I put this heavy logic"? Typical answers range from the model itself, to service objects, to concerns that cut across domains. I'm personally a fan of service objects, and that's what I tend to use to group together functionality that contains "heavier" processing, and is related in scope.

For example, I have an agriculture product that is a irrigation management platform. It acts both as a digital overlay, for farmers that don't wish to control their irrigation infrastructure remotely, and it has real-world IoT integrations as an add-on feature.

There is a LOT of custom processing to be done throughout the application, and I've found that it fits my mental model best to organize the code into service objects that group together functions related to different aspects of the platform.

__To say that I lean heavily on service objects *may* be an understatement.__

I've also seen several other projects that use service objects, and I've been a little shocked at seeing the way some of them handle how they return data. We're talking about methods that organize several different things that have to happen properly, often including reaching out to third-party platforms, all happening underneath the hood of the methods being called from the API controllers. There's a LOT that can go wrong within each service method, and these "entry" service methods (methods called from controllers that act as entry points to platform functionality) often act as an organizer for other service objects/methods that handles smaller, specific bits of processing. If something goes wrong __N__ levels deep within the entry service object method, how will the controller (or any of the intermediate levels of the call stack) know how to handle the returned data?

I've seen some service methods that return an object if successful, or `false` if unsuccessful. It's cool to know that something went wrong, sure, and `false` _generally_ tells us this. But....what went wrong? The caller of the method been left in the dark as to what the actual problem was within that method. How does the code that errored communicate what happened with the calling function? Should it just return a false too? Once we've travelled all the way back up the stack to the controller, how does the controller handle that and communicate with the user what went wrong? Should it just send back a blanket `500` with no additional information?

You effectively convey zero useful information back up the stack using this, and similar, return strategies. It leaves you with a lot of questions when things go wrong but your error reporting software doesn't catch a hard error anywhere.

### So what do you do instead?

I've seen 2 strategies that I think _do_ work well, in that they at least effectively allows us to pass relevant error information back up the stack to the calling methods so that the problem can be communicated to the requesting user. The key is to pass back a structure that contains __BOTH__ the relevant data object (whether it is a model, PORO, primitive, whatever) __AND__ any errors that occurred.

I've used both of these strategies, and I wrote a `CustomError` class that I use to store processing errors that have happened within service objects, and contains some helpful utility methods on the object.

#### Option 1: Return an array of objects

Example: 
```
return [ObjectInQuestion, CustomError]
```

The first option I've seen that "works" is to always return an array of information, with the payload being the first item in the array, and the errors that occurred in the method being called in the second item in the array.

So from a controller, when a user wants to begin an irrigation session, they hit an endpoint that would do something like:

`pump, errors = PumpService.start_session(pump: pump_id, duration: duration, user: @api_user)`

Then to know whether it was successful, I can check the `errors` variable (which in this case is a `CustomError` object) for whether any errors occurred and send back debugging information to the user so they know what went wrong. The `CustomError` object holds an array of strings, meant to be user-friendly error messages, that can be played back in the order they occurred.

```
render json: { 
    success: false, 
    payload: nil, 
    errors: errors.as_sentence 
}, status: :internal_server_error and return unless errors.none?
```

#### Option 2: Return an OpenStruct

Example:

```
return OpenStruct.new({ 
    success?: true, 
    payload: ObjectInQuestion, 
    errors: CustomError.new("a custom error message")
})
```

The second option here is actually my favorite. OpenStruct is a powerful object that I really enjoy using for this purpose.

One benefit of returning the OpenStruct rather than an array of objects is that I don't have to know what order the method being called returns data in. All of the relevant information is contained within the single returned object:

- A way to determine whether the operation worked (`.success?`)
- A way to access the payload being returned by the method (`.payload`)
- A way to access the errors that were generated by the method (`.errors`)

In practice, it may look a bit like this:

```
result = PumpService.start_session(pump: pump_id, duration: duration, user: @api_user)

# return if result was not successful
render json: { 
    success: false, 
    errors: result.payload.as_sentence 
}, status: :internal_server_error unless result.success?

# return if result was successful
render json: { 
    success: true, 
    payload: result.payload 
}, status: :ok and return
```

<br/>

Here I return different JSON responses based on whether or not the OpenStruct's `success?` attribute was true or false, as I only want to return a successful response to the client IFF all of the things that must have been successful during the operation was successful. If any of the several steps involved in the process fails, the request fails. Underneath the hood, `start_session()` is responsible for orchestrating several other service objects and methods. Using this structure, each layer in the structure knows enough information about the outcome of the methods they call that they can handle each one on its own, and take appropriate action based on what the OpenStruct from the lower-level methods being called returned.

#### What's the lesson?

Because both of these approaches always returns the payload AND any errors that occurred along the way, you can easily 'bubble up' processing errors from deep within the call stack this way, and handle them in your own code if you'd like. Perhaps you have specific error messages you want to send back unique API responses for, or maybe you want to do some custom event logging based on those errors; I feel like you can more easily do that with either of these approaches!

Until my next post...
<br/>
![Arnold Schwarzenegger I'll be back gif](https://media.giphy.com/media/JDKxRN0Bvmm2c/giphy.gif)