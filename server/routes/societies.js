import express from 'express'

import { getSocieties, createSociety, updateSociety, deleteSociety } from '../controllers/societies.js'

const router = express.Router()

router.get('/', getSocieties)
router.post('/', createSociety)
router.patch('/:id', updateSociety)
router.delete('/:id', deleteSociety)

export default router