var extend = require('util')._extend;
var format = require('util').format;
var https = require('https');

/**
 * @module OneSignal
 * @class OneSignal
 */
function OneSignal() {
    this.options = {
        host: 'onesignal.com',
        port: 443,
        version: 'v1',
        debug: false
    };
}

/**
 * This method updates settings
 * @param {Object} options settings
 * @memberof OneSignal
 * @method setup
 */
OneSignal.prototype.setup = function (options) {
    if (options instanceof Object) {
        this.options = extend(this.options, options);
    }
};

/**
 * This method makes request
 * @memberof OneSignal
 * @method request
 * @private
 */
OneSignal.prototype.__request = function (options, data, callback) {
    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            try {
                var response = JSON.parse(data);
                if (response.hasOwnProperty('errors') && response.errors instanceof Array && response.errors.length) {
                    callback(response.errors);
                } else {
                    callback(null, response);
                }
            } catch (e) {
                callback([e]);
            }
        });
    });

    try {
        req.on('error', function (e) {
            callback([e]);
        });
        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    } catch (e) {
        callback([e]);
    }
};

/**
 * This method makes a get request
 * @memberof OneSignal
 * @method get
 */
OneSignal.prototype.get = function (path, callback) {
    this.__request({
        host: this.options.host,
        port: this.options.port,
        path: format('/api/%s/%s', this.options.version, path),
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': format('Basic %s', this.options.api_key)
        }
    }, null, callback);
};

/**
 * This method makes a post request
 * @memberof OneSignal
 * @method post
 */
OneSignal.prototype.post = function (path, data, callback) {
    this.__request({
        host: this.options.host,
        port: this.options.port,
        path: format('/api/%s/%s', this.options.version, path),
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': format('Basic %s', this.options.api_key)
        }
    }, data, callback);
};

/**
 * This method makes a put request
 * @memberof OneSignal
 * @method put
 */
OneSignal.prototype.put = function (path, data, callback) {
    this.__request({
        host: this.options.host,
        port: this.options.port,
        path: format('/api/%s/%s', this.options.version, path),
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': format('Basic %s', this.options.api_key)
        }
    }, data, callback);
};

/**
 * This method makes a get request
 * @memberof OneSignal
 * @method delete
 */
OneSignal.prototype.delete = function (path, callback) {
    this.__request({
        host: this.options.host,
        port: this.options.port,
        path: format('/api/%s/%s', this.options.version, path),
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': format('Basic %s', this.options.api_key)
        }
    }, null, callback);
};

exports.OneSignal = OneSignal;
exports.$instance = new OneSignal();
