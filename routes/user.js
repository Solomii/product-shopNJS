const router = require("express").Router();

router.get('/usertest', (req, res) => {
   res.send("user test is successfull")
})

router.post("/userpost", (req, res) => {
  const userName = req.body.userName;
  res.send("your userName is" + userName)
})

module.exports = router;