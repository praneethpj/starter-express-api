const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const titleModel = require("../models/title.model.js");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.payment = require("../models/payment.model.js")(sequelize, Sequelize);
db.userurl = require("../models/userurl.model.js")(sequelize, Sequelize);
db.userprofessional = require("../models/userprofessional.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.schedule = require("../models/schedule.model.js")(sequelize, Sequelize);
db.documents = require("../models/documents.model.js")(sequelize, Sequelize);
db.call_schedule= require("../models/call.schedule.model.js")(sequelize, Sequelize);
db.notification= require("../models/notification.model.js")(sequelize, Sequelize);
db.title = require("../models/title.model.js")(sequelize, Sequelize);

db.country= require("../models/country.model.js")(sequelize, Sequelize);
db.experience= require("../models/experience.model.js")(sequelize, Sequelize);
db.gender= require("../models/gender.model.js")(sequelize, Sequelize);
db.language= require("../models/language.model.js")(sequelize, Sequelize);
db.perhourcharge= require("../models/perhourcharge.model.js")(sequelize, Sequelize);
 
db.chatmessages= require("../models/chatmessages.model.js")(sequelize, Sequelize);
db.callhistory= require("../models/callhistory.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.payment.belongsToMany(db.user, {
  through: "user_payment",
  foreignKey: "paymentId",
  otherKey: "userId"
});

db.user.belongsToMany(db.payment, {
  through: "user_payment",
  foreignKey: "userId",
  otherKey: "paymentId"
});


db.userprofessional.belongsToMany(db.user, {
  through: "user_professionals",
  foreignKey: "userProfessionalId",
  otherKey: "userId"
});

db.userprofessional.belongsToMany(db.type, { through: 'user_types' })

// db.userprofessional.associate = function(models) {
//   db.userprofessional.belongsTo(models.Title, { foreignKey: 'name' });
// };

db.user.belongsToMany(db.userprofessional, {
  through: "user_professionals",
  foreignKey: "userId",
  otherKey: "userProfessionalId"
});
// db.userprofessional.hasMany(db.schedule, {foreignKey: 'id'})

db.user.belongsToMany(db.userprofessional, {
  through: "user_professionals",
  foreignKey: "userId",
  otherKey: "userProfessionalId"
});

// db.type.belongsToMany(db.user, {
//   through: "type",
//   foreignKey: "typeId",
//   otherKey: "userId"
// });

// db.user.belongsToMany(db.type, {
//   through: "type",
//   foreignKey: "userId",
//   otherKey: "typeId "
// });


// db.schedule.belongsToMany(db.user, {
//   through: "user_schedule",
//   foreignKey: "id",
//   otherKey: "userId"
// });

db.documents.belongsToMany(db.user, {
  through: "user_documents",
  foreignKey: "scheduleId",
  otherKey: "userId"
});

db.notification.belongsToMany(db.user, {
  through: "notification_user",
  foreignKey: "notificationId",
  otherKey: "userId"
});


db.call_schedule.belongsToMany(db.user, {
  through: "user_call_schedule",
  foreignKey: "scheduleId",
  otherKey: "userId"
});
db.call_schedule.hasMany(db.call_schedule, {foreignKey: 'uid'})


// db.user.belongsToMany(db.schedule, {
//   through: "schedule",
//   foreignKey: "userId",
//   otherKey: "scheduleId "
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;