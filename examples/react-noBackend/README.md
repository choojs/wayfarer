# react-noBackend

This is an example configuration for using hashed url's with Wayfarer, removing
the necessity for a backend.

## How does it work?

With regular url's a request is made to the full URL, asking for a server
response on that URL:
```
http://google.com
// => 'status: 200'

http://google.com/gmail
// => 'status: 200'

http://google.com/asdfasdfasdf
// => 'status: 404'
```

When using hashed URLs a response is made to the part before the hash:
```
http://google.com#
// request to: 'http://google.com'
// => 'status: 200'

http://google.com/calendar#helloYou
// request to 'http://google.com/calendar'
// => 'status: 200'
```

So by using hashed URLs the server just needs to respond to the `/` path,
and the router will pick up on everything after the hash. This is the way GitHub
handles gh-pages, so by placing an `index.html` in root + rolling a hash router
you should be good to go.

## Disclaimer
The code written here was adapted from a real-world project without any testing.
It's meant to be used mainly as a reference.

Hashed routes are often not cached by search-engines.