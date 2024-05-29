import { Request, Response } from 'express';
import bookService from '../services/bookService';
import { Roles } from '../constants'

const uploadBooks = async (req: Request, res: Response) => {
    const sellerId = (req as any).user.id;
    const result = await bookService.uploadBooks(req.file?.path, sellerId);
    return res.send(result);
};

const getBooks = async (req: Request, res: Response) => {
    const role = (req as any).user.role;
    console.log((req as any).user.id);
    if(role === Roles.BUYER) res.send(await bookService.getBooks()); 
    else if(role === Roles.SELLER) res.send(await bookService.getBooksBySellerId((req as any).user.id));
    else res.status(403).json({ message: "Unauthorized role" });
};

const getBookById = async(req: Request, res: Response) => {
    const role = (req as any).user.role;
    try{
        if (role === Roles.BUYER){
            res.send(await bookService.getBookByIdForBuyer(parseInt((req as any).params.bookId)));
        } else if (role === Roles.SELLER){
            res.send(await bookService.getBookByIdForSeller(parseInt((req as any).params.bookId), (req as any).user.id))
        } else res.status(403).json({ message: "Unauthorized role" });
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "No corresponding book was found." });
    }
}

const updateBook = async (req: Request, res: Response) => {
    try{
        (req as any).body.publishedDate = new Date((req as any).body.publishedDate);
        res.send(await bookService.updateBook(parseInt((req as any).params.bookId), (req as any).user.id, (req as any).body));
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: "No corresponding book was found." });
    }
}

const deleteBook = async (req: Request, res: Response) => {
    try{
        res.send(await bookService.deleteBook(parseInt((req as any).params.bookId), (req as any).user.id));
    } catch (error){
        console.log(error);
        res.status(403).json({ message: "No corresponding book was found."});
    }
}

export default {
    uploadBooks,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};