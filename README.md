Url
===

Url parser

```javascript
parse = require('kaerus-component-url');

url = parse("http://some.dot.host:432/test#!/thing?query=string&more=stuff");
{ 
	protocol: 'http',
  	username: undefined,
  	password: undefined,
  	hostname: 'some.dot.host',
  	port: '432',
  	path: { 
  		base: 'test',
  		hash: '!/thing',
  		query: { 
  			parts: [ 'query=string', 'more=stuff' ],
     		params: {query:'string',more:'stuff'},
  		}
  	}
}

url.toString()
'http://some.dot.host:432/test#!/thing?query=string&more=stuff'

url.path.toString()
'test#!/thing?query=string&more=stuff'

url.path.query.toString()
'query=string&more=stuff'
```