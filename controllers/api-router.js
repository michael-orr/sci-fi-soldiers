const { User, Goal, Comment, Post, Professional, ProfessionalServices, Services } = require("../models");
const withAuth = require("../util/withAuth");

const router = require("express").Router();

// POST /api/users 			create user, client or profession and login
router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create(req.body, { username, password });
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
      }
      res.json({ id: user.id });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  };
});

// POST /api/pro-users 			create user, client or profession and login
router.post("/pro-users", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create(req.body, { username, password });
    const pro = await Professional.create({
      "user_id": user.id,
      "calendly": req.body.professional.calendly,
      "bio": req.body.professional.bio
    });

    const servicesData = req.body.professional.professional_services
    const services = []
    for (let i=0; i<servicesData.length; i++){
    const service = await ProfessionalServices.create({
      "professional_id": pro.id,
      "services_id": servicesData[i]
    });
    services.push(service);
  };
    
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
      }
      res.json({ user, pro, services });
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  };
});


router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error("User not found.");
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    req.session.isLoggedIn = true;
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
      }
      res.json({ id: user.id });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid username or password." });
  }
});

router.get("/users/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.end();
  });
});

// POST 	/api/goals		auth	creates a new goal for logged in client
router.post("/goals", withAuth, async (req, res) => {
    const { body } = req;
    try {
      const newGoal = await Goal.create({
        "name": body.name,
        "goal_type_id": body.goal_type_id,
        "client_id": body.client_id,
        "professional_id": body.professional_id
      });
      res.json(newGoal);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
});

router.get("/allgoals", withAuth, async (req, res) => {
    try {
    const allGoals = await Goal.findAll();
    console.log(allGoals)
    res.json(allGoals);
  } catch (err) {
    res.status(500).json(err);
  }
});


// POST 	/api/posts		auth	creates a new post
router.post("/posts", withAuth, async (req, res) => {
    const { body } = req;
    try {
      const newPost = await Post.create({ ...body, userId: req.session.userId });
      res.json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

// POST 	/api/comments      	auth    adds a comment to a specific post
router.post('/comments', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.userId,
      });
      console.log(newComment)
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
