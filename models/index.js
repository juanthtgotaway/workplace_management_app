const User = require('./User');
const Departments = require('./departments');
const Chores = require('./Chores');
const Reports = require('./Reports');
const Schedules = require('./Schedules');
// const DepEmployees = require('./DepEmployees')


//not completed key relationships
User.hasMany(Chores, {
    foreignKey: 'user_id'
});

Chores.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Reports, {
    foreignKey: 'reported_by',
    onDelete: 'CASCADE'
});

Reports.belongsTo(User, {
    foreignKey: 'reported_by'
})

User.hasOne(Departments, {
    foreignKey: 'user_id'
});

User.hasOne(Schedules, {
    foreignKey: 'user_id'
});

Schedules.belongsTo(User, {
    foreignKey: 'user_id'
});

// TODO FIX EMPLOYEES AND DEPARTMENTS RELATIONS
Departments.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = { User, Departments, Reports, Chores, Schedules };

