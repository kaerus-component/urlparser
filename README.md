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

License
=======
```
Copyright (c) 2013 Kaerus (kaerus.com), Anders Elo <anders @ kaerus com>.
```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.