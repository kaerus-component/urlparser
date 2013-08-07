

<!-- Start index.js -->

## urlparser

Provides with an Url parser that deconstructs an url into a managable object and back to a string.

     url = require('urlparser');
     
     var u = url.parse(&quot;http://user:pass@kaerus.com/login?x=42&quot;);
     
     u.host.hostname = 'database.kaerus.com'
     u.host.password = 'secret';
     u.host.port = 8529;
     u.query.parts.push({a:13});
     u.toString(); //=&gt; 'http://user:secret@database.kaerus.com:8529/login?x=42&amp;a=13'
     

## UrlParser({String})

@class  UrlParser

### Params: 

* **url** *{String}* 

@method  toString 

### Return:

* **String** 

## host

Host attributes

     host: {
         protocol: {String}
         username: {String}
         password: {String}
         hostname: {String}
         port: {String}
     }
     

## path

Path information

     path: {
         base: {String} // base path without hash
         hash: {String} // the #hash part in path
     }
     

## query

Query parameters

     query: {
         parts: {Array}   // query segments [&quot;a=3&quot;,&quot;x=2&quot;] 
         params: {Object} // query parameters {a:3,x:2}
     }
     

<!-- End index.js -->

