const Client = require('./Client');
const ClientServices = require('./ClientServices');
const Goal = require('./Goal');
const GoalType = require('./GoalType');
const Professional = require('./Professional');
const ProfessionalServices = require('./ProfessionalServices');
const Services = require('./Services');
const User = require('./User');
const Role = require('./Role');
const Post = require('./Post');
const Comment = require('./Comment');
const Question = require('./Question');
const PostQuestionAnswer = require('./PostQuestionAnswer');



//one to one relationship with Client(child) to User(parent)
Client.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasOne(Client, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//one to one relationship with Professional(child) to User(parent)
Professional.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasOne(Professional, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Goal(child) to Client(parent)
Goal.belongsTo(Client, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
});

Client.hasMany(Goal, {
  foreignKey: 'client_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Goal(child) to Professional(parent)
Goal.belongsTo(Professional, {
  foreignKey: 'professional_id',
  onDelete: 'CASCADE',
});

Professional.hasMany(Goal, {
  foreignKey: 'professional_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Goal(child) to GoalType(parent)
Goal.belongsTo(GoalType, {
  foreignKey: 'goal_type_id',
  onDelete: 'CASCADE',
});

GoalType.hasMany(Goal, {
  foreignKey: 'goal_type_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Post(child) to Goal(parent)
Post.belongsTo(Goal, {
  foreignKey: 'goal_id',
  onDelete: 'CASCADE',
});

Goal.hasMany(Post, {
  foreignKey: 'goal_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Comment(child) to Post(parent)
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Comment(child) to User(parent)
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Comment(child) to User(parent)
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//one to many relationship with Questions(child) to GoalType(parent)
Question.belongsTo(GoalType, {
  foreignKey: 'goal_type_id',
  onDelete: 'CASCADE',
});

GoalType.hasMany(Question, {
  foreignKey: 'goal_type_id',
  onDelete: 'CASCADE',
});


//many to many realtionship Post() to Question() through PostQuestionAnswer
Post.belongsToMany(Question, {
  through: {
    model: PostQuestionAnswer,
    unique: false
  },
  as: "post_question_answers"
});

Question.belongsToMany(Post, {
  through: {
    model: PostQuestionAnswer,
    unique: false
  },
  as: "question_answer_post"
});

//one to one relations with PostQuestionAnswer(child) to Post(parent)
PostQuestionAnswer.belongsTo(Post, {
  foreignKey: 'post_id'
});

Post.hasMany(PostQuestionAnswer, {
  foreignKey: 'post_id'
});

//one to many relationship with PostQuestionAnswer(child) to Question(parent)
PostQuestionAnswer.belongsTo(Question, {
  foreignKey: 'question_id'
});

Question.hasMany(PostQuestionAnswer, {
  foreignKey: 'question_id'
});


//one to many relationship with User(child) to Role(parent)
User.belongsTo(Role, {
  foreignKey: 'role_id'
});

Role.hasMany(User, {
  foreignKey: 'role_id'
});

// many to many relations with Professional() to Services() through ProfessionalServices
Professional.belongsToMany(Services, {
  through: {
    model: ProfessionalServices,
    unique: false,
    foreignKey: "professional_id"
  },
  as: "professional_service"
});

Services.belongsToMany(Professional, {
  through: {
    model: ProfessionalServices,
    unique: false,
    foreignKey: "services_id"
  },
  as: "services_professional"
});

//one to one relations with ClientServices(child) to Client(parent)
ProfessionalServices.belongsTo(Professional, {
  foreignKey: 'professional_id'
});

Professional.hasMany(ProfessionalServices, {
  foreignKey: 'professional_id'
});

// many to many relations with Client() to Services() through ClientServices
Client.belongsToMany(Services, {
  through: {
    model: ClientServices,
    unique: false
  },
  as: "client_service"
});

Services.belongsToMany(Client, {
  through: {
    model: ClientServices,
    unique: false
  },
  as: "services_client"
});

//one to many relations with ClientServices(child) to Client(parent)
ClientServices.belongsTo(Client, {
  foreignKey: 'client_id'
});

Client.hasMany(ClientServices, {
  foreignKey: 'client_id'
});

//one to many relations with ClientServices(child) to Services(parent)
ClientServices.belongsTo(Services, {
  foreignKey: 'services_id'
});

Services.hasMany(ClientServices, {
  foreignKey: 'services_id'
});

//one to many relations with ClientServices(child) to Services(parent)
ProfessionalServices.belongsTo(Services, {
  foreignKey: 'services_id'
});

Services.hasMany(ProfessionalServices, {
  foreignKey: 'services_id'
});

module.exports = { User, Services, Role, ProfessionalServices, Professional, GoalType, Goal, ClientServices, Client, Post, Comment, Question, PostQuestionAnswer };
