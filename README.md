Url
===

Url parser

```
var url = require('url');

> u = url.parse('http://test:pra@123.12.3.1:555/test?a=1&b=2')
{ host: 
   { protocol: 'http',
     username: 'test',
     password: 'pra',
     name: '123.12.3.1',
     port: '555' },
  path: { base: 'test', hash: undefined },
  query: 
   { parts: [ 'a=1', 'b=2' ],
     params: { a: '1', b: '2' } } }
> u.toString()
'http://test:pra@123.12.3.1:555/test?a=1&b=2'
> u.host.toString()
'http://test:pra@123.12.3.1:555'
> u.path.toString()
'test'
> u.query.toString()
'a=1&b=2'
> u.query.params.b
'2'

```