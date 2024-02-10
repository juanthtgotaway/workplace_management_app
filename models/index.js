const User = require('./User');
const Departments = require('./departments');
const Chores = require('./Chores');
const Reports = require('./Reports');
const Schedules = require('./Schedules');
const DepEmployees = require('./DepEmployees')


//not completed key relationships
User.hasMany(Chores, {
    foreignKey: 'user_id'
});

Chores.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Reports, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Reports.belongsTo(User, {
    foreignKey: 'user_id'
})

// User.hasOne(Departments, {
//     foreignKey: 'user_id'
// });

User.hasOne(Schedules, {
    foreignKey: 'user_id'
});

Schedules.belongsTo(User, {
    foreignKey: 'user_id'
});

// TODO FIX EMPLOYEES AND DEPARTMENTS RELATIONS
// Departments.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// i know that Each user will likely only have one department but im not sure how else to set up a "through" table
User.belongsToMany(Departments, {
    through: {
        model: DepEmployees,
        unique: false
    },
    as: `users_department`
});

Departments.belongsToMany(User, {
    through: {
        model: DepEmployees,
        unique: false
    },
    as: 'department_staff'
});


module.exports = { User, Departments, Reports, Chores, Schedules, DepEmployees };

