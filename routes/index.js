import express from 'express'
const router = new express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'welcome to our api' })
})

export default router
