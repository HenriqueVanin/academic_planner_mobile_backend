const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://utfplanadmin:utf2021@utfplandatabase.cgt2j.mongodb.net/UTFPlanDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
module.exports = mongoose;