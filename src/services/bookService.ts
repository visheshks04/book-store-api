import prisma from "../prismaClient";
import csv from 'csv-parser';
import fs from 'fs';

const uploadBooks = async (filePath: string | undefined, sellerId: number) => {
    if(!filePath) throw new Error("Invalid file path.");

    const books: {title: string, author: string, publishedDate: string, price: number}[] = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => books.push(data))
        .on('end', async () => {
            for(const book of books){
                await prisma.book.create({
                    data:{
                        title: book.title,
                        author: book.author,
                        publishedDate: new Date(book.publishedDate),
                        price: +book.price,
                        sellerId: sellerId,
                    },
                });
            }
        });

    console.log(filePath);
    await fs.rm(filePath, () => console.log("Upload cleaned up!"));

    return { message: 'Books uploaded.' };
};

const getBooks = async () => {
    return await prisma.book.findMany();
};

const getBooksBySellerId = async (sellerId: number) => {
    return await prisma.book.findMany({ where: { sellerId: sellerId }});
};

const getBookByIdForSeller = async (id: number, sellerId: number) => {
    const book = await prisma.book.findUnique({ where: {id: id} });
    if (!book || book.sellerId !== sellerId) throw new Error("No corresponding book found for the sellerId");
    return book; 
};

const getBookByIdForBuyer = async (id: number) => {
    return await prisma.book.findUnique({ where: { id: id } });
}

const updateBook = async (id: number, sellerId: number, data: {
    title?: string,
    author?: string,
    publishedDate?: Date,
    price?: number,
}) => {
    const book = await prisma.book.findUnique({ where: { id: id }, select: { sellerId: true } });
    if (!book || book.sellerId !== sellerId) 
        throw new Error("No corresponding book found for the seller ID");
    return await prisma.book.update({ where: { id: id }, data: data });
};

const deleteBook = async (id: number, sellerId: number) => {
    const book = await prisma.book.findUnique({ where: {id: id}, select: { sellerId: true } });
    if (!book || book.sellerId !== sellerId) 
        throw new Error("No corresponding book found for the seller ID");
    return await prisma.book.delete({ where: { id: id } });
}

export default { 
    uploadBooks,
    getBooks,
    getBooksBySellerId,
    getBookByIdForSeller,
    getBookByIdForBuyer,
    updateBook,
    deleteBook 
};
