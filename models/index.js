const User = require('./models/User');
const Department = require('./models/Departments');
const Chores = require('./models/Chores');
const Reports = require('./models/Reports');
const Schedules = require('/models/Schedules');


//not completed key relationships
User.hasMany(Chores)

User.hasMany(Reports)

User.hasOne(Department)

User.hasOne(Schedules)

Chores.belongsTo(User)

Schedules.belongsTo(User)

Department.belongsTo(User)

