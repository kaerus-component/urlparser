var should = require('should'),
url = require('..');

describe('Url', function(){
    describe('methods', function(){
        it('should export parse method', function(){
            url.should.have.ownProperty('parse');
        })
    })

    describe('parse', function(){
       it('should parse /hello',function(){
          var parsed = url.parse('/hello');
          parsed.should.eql({
            path: {base: 'hello'}
          })
        })

       it('should parse /hello.world',function(){
          var parsed = url.parse('/hello.world');
          parsed.should.eql({
            path: {base: 'hello.world'}
          })
        })


        it('should parse /hello:world',function(){
          var parsed = url.parse('/hello:world');
          parsed.should.eql({
            path: {base: 'hello', name:'world'}
          })
        })

        it('should parse /hello:/world',function(){
          var parsed = url.parse('/hello:/world');
          parsed.should.eql({
            path: {base: 'hello', name:'/world'}
          })
        })

        it('should parse /hello:/world',function(){
          var parsed = url.parse('/hello:/world.file');
          parsed.should.eql({
            path: {base: 'hello', name:'/world.file'}
          })
        })

        it('should parse /hello:world#hash',function(){
          var parsed = url.parse('/hello:world#hash');
          parsed.should.eql({
            path: {base: 'hello', name:'world', hash:'hash'}
          })
        })

        it('should parse /hello:world#hash?query=test',function(){
          var parsed = url.parse('/hello:world#hash?query=test');
          parsed.should.eql({
            path: {base: 'hello', name:'world', hash: 'hash'},
            query:{parts:['query=test'], "params":{query:'test'}}
          })
        })

        it('should parse /hello:world#hash?query=test&another=option',function(){
          var parsed = url.parse('/hello:world#hash?query=test&another=option');
          parsed.should.eql({
            path: {base: 'hello', name:'world', hash: 'hash'},
            query:{parts:['query=test','another=option'], "params":{query:'test',another:'option'}}
          })
        })

        it('should parse http://test.com/hello', function(){
           	var parsed = url.parse('http://test.com/hello');
           	parsed.should.eql( {host:{protocol:"http",hostname:"test.com"},path:{base:"hello"}});
            should.equal(parsed.toString(),'http://test.com/hello');
        })

        it('should parse http://test.com/?what=hello', function(){
           	var parsed = url.parse('http://test.com/?what=hello');
           	parsed.should.eql( {
           		host: {protocol:"http",hostname:"test.com"},
           		query:{parts:["what=hello"],params:{"what":"hello"}}
           	});
            should.equal(parsed.toString(),'http://test.com?what=hello'); // note: slash removed before query string
        })

        it('should parse http://test.com/?what=hello&x=132', function(){
           	var parsed = url.parse('http://test.com/?what=hello&x=132');
           	parsed.should.eql( {
           		host: {protocol:"http",hostname:"test.com"},
           		query:{parts:["what=hello","x=132"],params:{"what":"hello","x":"132"}}
           	});
            should.equal(parsed.toString(),'http://test.com?what=hello&x=132');
        })

        it('should parse http://user:pass@test.com', function(){
           	var parsed = url.parse('http://user:pass@test.com');
           	parsed.should.eql( {
           		host: {protocol:"http",hostname:"test.com",username:"user",password:"pass"}
           	});
            should.equal(parsed.toString(),'http://user:pass@test.com');
        })

        it('should parse https://user:pass@localhost:8529/path', function(){
            var parsed = url.parse("https://user:pass@localhost:8529/path");
            parsed.should.eql( {
              host: {protocol:"https",hostname:"localhost",username:"user",password:"pass",port:"8529"},
              path:{base:"path"}
            });
            should.equal(parsed.toString(),"https://user:pass@localhost:8529/path");
        })

        it('should parse http://user:pass@test.com/index.html#start', function(){
           	var parsed = url.parse('http://user:pass@test.com/index.html#start');
           	parsed.should.eql( {
           		host: {protocol:"http",hostname:"test.com",username:"user",password:"pass"},
           		path: {base:"index.html",hash:"start"}
           	});
            should.equal(parsed.toString(),'http://user:pass@test.com/index.html#start');
        })

        it('should parse http://user:pass@123.123.10.1/index.html#start?test=something', function(){
           	var parsed = url.parse('http://user:pass@123.123.10.1/index.html#start?test=something');
           	parsed.should.eql( {
           		host: {protocol:"http",hostname:"123.123.10.1",username:"user",password:"pass"},
           		path: {base:"index.html",hash:"start"},
           		query:{parts:["test=something"],params:{"test":"something"}}
           	});
            should.equal(parsed.toString(),'http://user:pass@123.123.10.1/index.html#start?test=something');	 	
        })
    })  
}) 