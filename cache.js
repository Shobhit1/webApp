var mc = require('mc');

// All defaults
var client = undefined
exports.connect = function() {
  client = new mc.Client()

  // client.port = 11211
  // client.host = 'localhost'

  client.connect(function() {
      console.log("Connected to the memcache on host 1.2.3.4 on port 11211!")
    }
  )

  return client
}

exports.get = function(key, callback) {
  // client.setAdapter(mc.Adapter.json)
  client.get(key, callback)
}
exports.set = function(key, value) {
    console.log("Parekh")
    client.set(key, value, { flags: 0, exptime: 0}, function(error, status){
      if (!error) {
        console.log("Vivek"+status); // 'STORED' on success!
      }else{
        console.log(JSON.stringify(error))
      }
    })
};
