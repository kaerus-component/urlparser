/**
 * Provides with an Url parser that deconstructs an url into a managable object and back to a string.
 *
 *  ### Examples:
 *  
 *      url = require('urlparser');
 *      
 *      var u = url.parse('http://user:pass@kaerus.com/login?x=42');
 *      
 *      u.host.hostname = 'database.kaerus.com'
 *      u.host.password = 'secret';
 *      u.host.port = 8529;
 *      u.query.parts.push('a=13');
 *      u.toString(); // 'http://user:secret@database.kaerus.com:8529/login?x=42&a=13'
 *      
 * @module  urlparser
 * @name urlparser
 * @main  urlparser
 */

var URL = /^(?:(?:([A-Za-z]+):?\/{2})?(?:(\w+)?:?([^\x00-\x1F^\x7F^:]*)@)?([\w\-\.]+)?(?::(\d+))?)\/?(([^\x00-\x1F^\x7F^\#^\?^:]+)?(?::([^\x00-\x1F^\x7F^\#^\?]+))?(?:#([^\x00-\x1F^\?]+))?)(?:\?(.*))?$/;

function urlString(o){
    var str = "";

    o = o ? o : this;
  
    str+= hostString(o);
    str+= pathString(o);
    str+= queryString(o);

    return str;
}

module.exports.url = urlString;

function hostString(o){
    var str = "";
  
    o = o ? o.host : this.host;

    if(o) {
        if(o.protocol) str+= o.protocol + '://';
        if(o.username) { 
            str+= o.username + (o.password ? ':' + o.password : '') + '@';
        }
        if(o.hostname) str+= o.hostname; 
        if(o.port) str+= ':' + o.port;
    }

    return str;    
}

module.exports.host = hostString;

function pathString(o){
    var str = "";
  
    o = o ? o.path : this.path;

    if(o) {
        if(o.base) str+= '/' + o.base;
        if(o.name) str+= ':' + o.name;
        if(o.hash) str+= '#' + o.hash;
    }

    return str;     
}

module.exports.path = pathString;

function queryString(o){
    var str = "";
    
    o = o ? o.query : this.query;

    if(o) {
        str = "?";
        if(o.parts)
            str+= o.parts.join('&');
    }

    return str;    
}

module.exports.query = queryString;
/**
 * @class  UrlParser
 * @constructor
 * @static
 * @param url {String}
 * @return {Object}
 */
function urlParser(parse) {

    var param, 
        ret = {};

    /**
     * @method  toString 
     * @return {String}
     */
    Object.defineProperty(ret,'toString',{
        enumerable: false,
        value: urlString
    });   

    
    if(typeof parse === 'string') {
        var q, p, u; 

        u = URL.exec(parse);

        /**
         * Host attributes
         *
         *      host: {
         *          protocol: {String}
         *          username: {String}
         *          password: {String}
         *          hostname: {String}
         *          port: {String}
         *      }
         *      
         * @attribute host
         * @type {Object} 
         */

        if(u[1] || u[4]) {
            ret.host = {};

            if(u[1]) ret.host.protocol = u[1];
            if(u[2]) ret.host.username = u[2];
            if(u[3]) ret.host.password = u[3];
            if(u[4]) ret.host.hostname = u[4];
            if(u[5]) ret.host.port = u[5]; 
        }
        /**
         * Path information
         *
         *      path: {
         *          base: {String} // base path without hash
         *          name: {String} // file or directory name
         *          hash: {String} // the #hash part in path
         *      }
         *      
         * @attribute path
         * @type {Object} 
         */

        if(u[6]) {
            ret.path = {};

            if(u[7]) ret.path.base = u[7];
            if(u[8]) ret.path.name = u[8];
            if(u[9]) ret.path.hash = u[9];
        }
        /**
         * Query parameters
         *
         *      query: {
         *          parts: {Array}   // query segments ['a=3','x=2'] 
         *          params: {Object} // query parameters {a:3,x:2}
         *      }
         *      
         * @attribute query
         * @type {Object} 
         */
        if(u[10]) {
            ret.query = {};
            ret.query.parts = u[10].split('&');
            if(ret.query.parts.length) {

                ret.query.params = {};
                ret.query.parts.forEach(function(part){
                    param = part.split('='); 
                    ret.query.params[param[0]] = param[1];   
                });
            }
        }
    }

    return ret; 
}

module.exports.parse = urlParser;