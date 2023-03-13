const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3001/socialNetworkApiDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;