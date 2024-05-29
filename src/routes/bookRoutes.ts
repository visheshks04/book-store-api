import express from 'express';
import bookController from '../controllers/bookController';
import authMiddleware from '../middlewares/authMiddleware';
import upload from '../utils/csvUpload';
import { Roles } from '../constants';

const router = express.Router();

router.post('/upload', authMiddleware([Roles.SELLER]), upload.single('file'), bookController.uploadBooks);
router.get('/', authMiddleware([Roles.SELLER, Roles.BUYER]), bookController.getBooks);
router.get('/:bookId', authMiddleware([Roles.SELLER, Roles.BUYER]), bookController.getBookById);
router.put('/:bookId', authMiddleware([Roles.SELLER]), bookController.updateBook);
router.delete('/:bookId', authMiddleware([Roles.SELLER]), bookController.deleteBook);

export default router;