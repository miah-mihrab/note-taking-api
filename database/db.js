const mongoose = require('mongoose');

mongoose
    .connect('mongodb://127.0.0.1:27017/notetakingapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    },

        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log("DB Connected")
            }
        });