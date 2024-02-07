const sequelize = require('../config/connection');
const { User, Reports, Departments, Schedules, Chores } = require('../models');

const userData = require('./user.json');
const reportsData = require('./reports.json');
const departmentsData = require('./departments.json');
const schedulesData = require('./schedules.json');
const choresData = require('./chores.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    await Reports.bulkCreate(reportsData, {
        individualHooks: true,
        returning: true,
    });
    await Departments.bulkCreate(departmentsData, {
        individualHooks: true,
        returning: true,
    });
    await Schedules.bulkCreate(schedulesData, {
        individualHooks: true,
        returning: true,
    });
    await Chores.bulkCreate(choresData, {
        individualHooks: true,
        returning: true,
    });


    process.exit(0);
};

seedDatabase();