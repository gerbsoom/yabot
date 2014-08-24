var redis = require("redis");

exports.setRedisValue = function (_cacheKey, _value)
 {
     var client = redis.createClient();
     client.on("error", function (err) {
         console.log("Error " + err);
     });
     client.set(_cacheKey, _value); // redis.print?
     client.quit();
 };

exports.getRedisValue = function (_cacheKey)
{
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    client.get(_cacheKey, function (result)
    {
        client.quit();
        return result;
    });
};

exports.getRedisHashMap = function (_cacheKey)
{
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });

    client.hgetall(_cacheKey, function (err, obj)
    {
        client.quit();
        return obj;
    });
};

exports.setRedisHashMap = function (_cacheKey, _key, _value)
{
    var client = redis.createClient();
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    client.hset(_cacheKey, _key, _value, redis.print);

    //client.hset([_cacheKey, _key, _value], redis.print);
    client.quit();
};

/*
 function getRedisHashMap(_cacheKey)
 {
 client = redis.createClient();
 client.on("error", function (err) {
 console.log("Error " + err);
 });

 client.hgetall(_cacheKey, function (err, obj)
 {
 client.quit();
 return obj;
 });
 }

 function setRedisHashMap(_cacheKey, _key, _value)
 {
 client = redis.createClient();
 client.on("error", function (err) {
 console.log("Error " + err);
 });
 client.hset(_cacheKey, _key, _value, redis.print);

 //client.hset([_cacheKey, _key, _value], redis.print);
 client.quit();
 }

 function setRedisValue(_cacheKey, _value)
 {
 client = redis.createClient();
 client.on("error", function (err) {
 console.log("Error " + err);
 });
 client.set(_cacheKey, _value);
 client.quit();
 }

 function getRedisValue(_cacheKey)
 {
 client = redis.createClient();
 client.on("error", function (err) {
 console.log("Error " + err);
 });
 var result = client.get(_cacheKey);
 client.quit();

 return result;
 }
 */