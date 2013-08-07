var should = require('should'),
url = require('..');

describe('Url', function(){
    describe('methods', function(){
        it('should expose parse method', function(){
            url.should.have.ownProperty('parse');
        })
    })

    describe('parse', function(){
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