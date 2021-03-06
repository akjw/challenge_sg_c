const router = require("express").Router();
const User = require('../models/user.model');
const passport = require("../config/passportConfig");


//--Register 
router.get('/register', (req, res) => {
  res.render('auth/signup')
})

router.post('/register', async (req, res) => {
  try {
      let { name, phone, password, address, isSenior, isHelper } = req.body;
      //don't save password in plain text
      let user = new User({ name, phone, address, isSenior, isHelper, password})
      let savedUser = await user.save()
      console.log(user)
      if(savedUser){
          res.redirect('/auth/login')
      }

  } catch (err){
      console.log(err)
  }
})

//-- Login Route
router.get('/login', (req, res) => {
  res.render('auth/signin')
})


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/list", //after login success
    failureRedirect: "/auth/login", //if fail
    failureFlash: "Invalid Username or Password",
    successFlash: "You have logged In!"
  })
);

//--- Logout Route
router.get("/logout", (request, response) => {
  request.logout(); //clear and break session
  request.flash("success", "Dont leave please come back!");
  response.redirect("/auth/login");
});

module.exports = router;
