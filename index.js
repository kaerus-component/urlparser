// Kaerus - Anders Elo 2013


/*
http://www.w3.org/TR/html4/types.html#type-name
ID and NAME tokens must begin with a letter ([A-Za-z]) 
and may be followed by any number of letters, digits ([0-9]), 
hyphens ("-"), underscores ("_"), colons (":"), and periods (".").

ABNF notation
fragment      = *( pchar / "/" / "?" )
pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
pct-encoded   = "%" HEXDIG HEXDIG
sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
                 / "*" / "+" / "," / ";" / "="
*/

var URL = /^(?:([A-Za-z]+):)?(\/{0,3})(?:([^\x00-\x1F\x7F:]+)?:?([^\x00-\x1F\x7F:]*)@)?([\w\.\-]+)?(?::(\d+))?(?:\/([^\x00-\x1F\x7F]+))?$/;

var PATH = /^([^\x00-\x1F^\#^\?]+)?(?:#([^\x00-\x1F^\?]+))?(?:\?(.*))?$/;

var url = {
    protocol: undefined,
    username: undefined,
    password: undefined,
    hostname: undefined,
    port: undefined,
    path: {
        base: undefined,
        hash: undefined,
        query: {
            parts: undefined,
            params: undefined
        },
    }
};

function urlString(){
    var str = "";
    if(this.protocol) str+= this.protocol + '://';
    if(this.username) { 
        str+= this.username + (this.password ? ':' + this.password : '') + '@';
    }
    if(this.hostname) str+= this.hostname; 
    if(this.port) str+= ':' + this.port;
    if(this.path.toString)
        str+= '/' + this.path.toString();

    return str;    
}

function pathString(){
    var str = "";
    if(this.base) str+= this.base;
    if(this.hash) str+= '#' + this.hash;
    if(this.query.toString)
        str+= '?' + this.query.toString();

    return str;     
}

function queryString(){
    var str = "";
    
    if(this.parts)
        str+= this.parts.join('&');

    return str;    
}

function Url(parse) {

    var ret = Object.create(url);
    
    if(typeof parse === 'string') {
        var q, p, u = URL.exec(parse);
        if(u) {
            ret.protocol = u[1];
            ret.username = u[3];
            ret.password = u[4];
            ret.hostname = u[5];
            ret.port = u[6];
            p = PATH.exec(u[7]);
        } else {
            p = PATH.exec(parse);
        }

        ret.toString = urlString;
        
        if(p) {
            ret.path.base = p[1];
            ret.path.hash = p[2];
            ret.path.toString = pathString;
            q = p[3];

            if(q) {
                ret.path.query.parts = q.split('&');
                if(ret.path.query.parts.length) {
                    var param;
                    ret.path.query.toString = queryString;
                    ret.path.query.params = {};
                    ret.path.query.parts.forEach(function(part){
                        param = part.split('='); 
                        ret.path.query.params[param[0]] = param[1];   
                    });
                    
                }    
            }
        }
    }

    return ret; 
}

module.exports = Url;

