const sequelize = require('../config/connection');
const { User, Reports, Departments, Schedules, Chores, DepEmployees } = require('../models');

const userData = require('./user.json');
const reportsData = require('./reports.json');
const departmentsData = require('./departments.json');
const schedulesData = require('./schedules.json');
const choresData = require('./chores.json');
const DepEmp = require('./dep-emp.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    const reports = await Reports.bulkCreate(reportsData, {
        individualHooks: true,
        returning: true,
    });
    const departments = await Departments.bulkCreate(departmentsData, {
        individualHooks: true,
        returning: true,
    });
    const schedules = await Schedules.bulkCreate(schedulesData, {
        individualHooks: true,
        returning: true,
        
    });
    const chores = await Chores.bulkCreate(choresData, {
        individualHooks: true,
        returning: true,
    });
    
    const departmentEmployees = await DepEmployees.bulkCreate(DepEmp, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();