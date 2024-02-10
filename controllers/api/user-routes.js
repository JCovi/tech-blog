// Defines routes for user authentication, including user sign-up, login, and logout functionalities, utilizing session management for user authentication state.
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }); 
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = newUserData.username;
      req.session.user_id = newUserData.user_id;
    });

    res.status(200).json({
      user: newUserData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(async ()  => {
      req.session.userId = await userData.id;
      req.session.userdata = await userData;
      req.session.loggedIn = true;
      
      res.status(200).json({ user: userData, message:  ' You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

