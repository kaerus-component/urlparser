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

var URL = /^(?:([A-Za-z]+):)?(\/{2})(?:(\w+)?:?([^\x00-\x1F^\x7F^:]*)@)?([\w]{1,61}?\.?[\w\.]{1,61})?(?::(\d+))?([^\x00-\x1F^\x7F]*)?$/;

var PATH = /^\/?(([^\x00-\x1F^\x7F^\#^\?^:]+))?(?::([^\x00-\x1F^\x7F^\#^\?]+))?(?:#([^\x00-\x1F^\?]+))?(?:\?(.*))?$/;

function urlString(o){
    var str = "";

    o = o ? o : this;

    if(o.host)
        str+= hostString(o.host);
    if(o.path)
        str+= '/' + pathString(o.path);
    if(o.query)
        str+= '?' + queryString(o.query);

    return str;
}

function hostString(o){
    var str = "";
  
    if(o.protocol) str+= o.protocol + '://';
    if(o.username) { 
        str+= o.username + (o.password ? ':' + o.password : '') + '@';
    }
    if(o.hostname) str+= o.hostname; 
    if(o.port) str+= ':' + o.port;
  
    return str;    
}

function pathString(o){
    var str = "";
  
    if(o.base) str+= o.base;
    if(o.name) str+= ':' + o.name;
    if(o.hash) str+= '#' + o.hash;
  
    return str;     
}

function queryString(o){
    var str = "";
    
    if(o.parts)
        str+= o.parts.join('&');

    return str;    
}

/**
 * @class  UrlParser
 * @constructor
 * @static
 * @param url {String}
 * @return {Object}
 */
function UrlParser(parse) {

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

        if(u) {

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
            ret.host = {};

            if(u[1]) ret.host.protocol = u[1];
            if(u[3]) ret.host.username = u[3];
            if(u[4]) ret.host.password = u[4];
            if(u[5]) ret.host.hostname = u[5];
            if(u[6]) ret.host.port = u[6]; 

            if(u[7]) p = PATH.exec(u[7]);
        } else {
            p = PATH.exec(parse);
        }
        
        if(p) {
            if(p[1]){
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
                ret.path = {};

                if(p[2]) ret.path.base = p[2];
                if(p[3]) ret.path.name = p[3];
                if(p[4]) ret.path.hash = p[4];
            }

            q = p[5];

            if(q) {
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
                ret.query = {};
                ret.query.parts = q.split('&');
                if(ret.query.parts.length) {

                    ret.query.params = {};
                    ret.query.parts.forEach(function(part){
                        param = part.split('='); 
                        ret.query.params[param[0]] = param[1];   
                    });
                    
                }    
            }
        }
    }

    return ret; 
}

module.exports = {parse:UrlParser};