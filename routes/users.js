import express from 'express'
const router = new express.Router()

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource')
})

router.get('/userList', (req, res) => {
  const db = req.db
  const collection = db.get('userInfo')
  collection.find({}, {}, (e, docs) => {
    res.render('userlist', {
      userlist: docs
    })
  })
})

router.get('/newuser', (req, res) => {
  res.render('newuser', { title: 'Add New User' })
})

router.post('/adduser', (req, res) => {
  // get db variable
  const db = req.db

  // get our form variables
  const userName = req.body.username
  const userEmail = req.body.useremail
  // set collection
  const collection = db.get('userInfo')

  // submit it to the db
  collection.insert({
    username: userName,
    useremail: userEmail
  }, (err) => {
    if (err) {
      res.send('There was a problem adding the information to the database.')
    } else {
      res.redirect('/users/userlist')
    }
  })
})


export default router
