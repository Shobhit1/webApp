import express from 'express'
const router = new express.Router()

/* GET helloworld */
router.get('/', (req, res) => {
  res.render('helloworld', { message: 'Hello World', name: 'Shobhit' })
})

export default router
