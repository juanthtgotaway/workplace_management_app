const User = require('./models/User');
const Department = require('./models/Departments');
const Chores = require('./models/Chores');
const Reports = require('./models/Reports');
const Schedules = require('/models/Schedules');


//not completed key relationships
User.hasMany(Chores, {
    foreignKey: user_id
});

User.hasMany(Reports, {
    foreignKey: user_id
});

User.hasOne(Department, {
    foreignKey: user_id
});

User.hasOne(Schedules, {
    foreignKey: user_id
});

Chores.belongsTo(User, {
    foreignKey: user_id
});

Schedules.belongsTo(User, {
    foreignKey: user_id
});

Department.belongsTo(User, {
    foreignKey: user_id
});

