const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String
});

const UserModel = mongoose.model('User', userSchema);


class User {
    Create(username) {
        const user = new UserModel({ username: username });
        user.save((err, user) => {
            if (err) {
                return console.error(err);
            }
            done(null, user);
        });
    }

    Find(username) {
        const user = UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return console.error(err);
            }
            done(null, user);
        });

    }
}

module.exports = User;