const router = require("express").Router();
const {
  User,
  Goal,
  Client,
  Post,
  PostQuestionAnswer,
  Comment,
  ClientServices,
  Services,
  Professional,
  ProfessionalServices,
  GoalType,
  Question,
} = require("../models");

// use withAuth middleware to redirect from protected routes.
const withAuth = require("../util/withAuth");


//home
router.get("/", async (req, res) => {
  try {
    let user;
    if (req.session.isLoggedIn) {
      user = await User.findByPk(req.session.userId, {
        exclude: ["password"],
        raw: true
      });
    }
    res.render("home", {
      title: "Home Page",
      isLoggedIn: req.session.isLoggedIn,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("⛔ Uh oh! An unexpected error occurred.");
  }
});

//login
router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page", layout:"centered.handlebars" });
});

//professional sign up page
router.get("/professionalsignup", async (req, res) => {
  const servicesData = await Services.findAll();
  const services = servicesData.map((services) =>
  services.get({ plain: true })
  );
  res.render("professionalsignup", { services, title: "Professional Sign-Up Page", layout: 'formpage.handlebars' });
});

//client sign up page
router.get("/clientsignup", async (req, res) => {
  const servicesData = await Services.findAll();
  const services = servicesData.map((services) =>
  services.get({ plain: true })
  );
  res.render("clientsignup", { services, title: "Client Sign-Up Page", layout:"formpage.handlebars" });
});

//list of professionals
router.get("/professionals", async (req, res) => {
  const professionalData = await Professional.findAll({
    include: [User, { model: ProfessionalServices, include: Services }],
  });
  const professionals = professionalData.map((professionals) =>
    professionals.get({ plain: true })
  );
  res.render("professionals", { professionals, title: "Choose a Professional" });
});

// professional dashboard
router.get("/dashboard/:prof_id", withAuth, async (req, res) => {
  try {
    const professionalData = await Professional.findByPk(req.params.prof_id, {
      include: [
        User,
        { model: ProfessionalServices, include: Services },
        {
          model: Goal,
          include: [
            GoalType,
            { model: Post, include: PostQuestionAnswer },
            { model: Client, include: User },
          ],
        },
      ],
    });
    const professional = professionalData.get({ plain: true });
    res.render("dashboard", professional);
  } catch (err) {
    res.status(500).json(err);
  }
});

//professional-profile
router.get("/professionals/:prof_id", async (req, res) => {
  try {
    const professionalData = await Professional.findByPk(req.params.prof_id, {
      include: [
        User,
        { model: ProfessionalServices, include: Services },
      ],
    });
    const professional = professionalData.get({ plain: true });
    res.render("professionalprofile", { 
       professional,
       title: professional.user.username,
      layout: "profile.handlebars"});
  } catch (err) {
    res.status(500).json(err);
  }
});



// new-goal page
router.get("/new-goal/:client_id", withAuth, async (req, res) => {
  try {
    const clientData = await Client.findByPk(req.params.client_id, {
      include: User,
    });
    const client = clientData.get({ plain: true });
    const professionalData = await Professional.findAll({
      include: User,
    });

    const professionals = professionalData.map((professionals) =>
      professionals.get({ plain: true })
    );

    const goalTypeData = await GoalType.findAll();
    const goalTypes = goalTypeData.map((goalTypes) =>
      goalTypes.get({ plain: true })
    );

    res.render("newgoal", { client, professionals, goalTypes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// goal/:id  Goal page for indvidual goal.
router.get("/goals/:goal_id", withAuth, async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.goal_id, {
      include: [
        { model: Client, include: User },
        {
          model: Post,
          order: ["date", "DESC"],
          include: [PostQuestionAnswer, { model: Comment, include: User }],
        },
        { model: GoalType, include: Question },
      ],
    });
    const goal = goalData.get({ plain: true });
    const currentWeight = goal.posts[0].post_question_answers[0].answer;
    const progressQuestions = goal.goal_type.questions.filter(
      (question) => question.question_type == "progress"
    );
    const current_user_id = req.session.userId;
    console.log(goal, currentWeight, progressQuestions, current_user_id)
    res.render("goal", { goal, currentWeight, progressQuestions, current_user_id });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Client profile page
router.get("/client/:client_id", withAuth, async (req, res) => {
  try {
    const clientData = await Client.findByPk(req.params.client_id, {
      include: [
        User,
        { model: ClientServices, include: Services },
        {
          model: Goal,
          include: [
            {
              model: Post,
              order: ["date", "DESC"],
              include: PostQuestionAnswer,
            },
            { model: Professional, include: User },
            GoalType
          ],
        },
      ],
    });

    const client = clientData.get({ plain: true });
    
    res.render("clientprofile", { client, layout:"profile.handlebars" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
