# Book Store API

This API allows sellers to manage books via CSV uploads and buyers to view available books. It features authentication and authorization to ensure proper access control.

## Features

- User authentication and authorization
- Seller book management via CSV upload
- Buyers can view all available books
- Sellers can view and manage their own books

## Setup Instructions

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/visheshks04/book-store-api.git
   cd book-store-api
   
2. **Install Dependencies**
    ```sh
    npm install
    
3. **Environment Variables**
    - Create a `.env` file in the root directory.
    - Add the following variables to your `.env` file:
        ```env
        DATABASE_URL="postgresql://user:password@localhost:5432/db"
        JWT_SECRET="your_jwt_secret"
        JWT_EXPIRATION="1d"
        PORT=3000
        
4. **Initialize the Database**
    ```sh
    npx prisma migrate dev --name init

5. **Start the server**
    ```sh
    npm start

## Endpoints
### Authentication

- **Register**
```sh
    curl --location --request POST 'http://localhost:3000/api/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Vishesh Seller",
    "email": "seller@vishesh.com",
    "password": "123",
    "role": "S" // "B" for buyer
}'
```


- **Login**
```sh
    curl --location --request POST 'http://localhost:3000/api/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "seller@vishesh.com",
    "password": "123"
}'
```

### Books
- **Upload Books (Seller Only):**
```sh
curl --location --request POST 'http://localhost:3000/api/v1/books/upload' \
--header 'Authorization: Bearer <TOKEN>' \
--form 'file=@"/path/to/Sample CSV for assignment - Sample CSV for assignment - Sheet1 (1).csv.csv"'
```

- **Get All Books (Buyer Only):**
```sh
curl --location --request GET 'http://localhost:3000/api/v1/books' \
--header 'Authorization: Bearer <TOKEN>'
```
- **Get Books by ID**
```sh
curl --location --request GET 'http://localhost:3000/api/v1/books/15' \
--header 'Authorization: Bearer <TOKEN>'
```

- **Update Book**
```sh
curl --location --request PUT 'http://localhost:3000/api/v1/books/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlMiLCJpYXQiOjE3MTY5NzI1OTYsImV4cCI6MTcxNjk3NjE5Nn0.Di-vp54EVBmqOVkm2zAIjnVELKD8pDIRIcFWSzeHUCY' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Updated Title",
    "author": "Updated Author",
    "publishedDate": "2024-05-28",
    "price": 19.99
}'
```

- **Delete Book**
```sh
curl --location --request DELETE 'http://localhost:3000/api/v1/books/2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlMiLCJpYXQiOjE3MTY5NzI1OTYsImV4cCI6MTcxNjk3NjE5Nn0.Di-vp54EVBmqOVkm2zAIjnVELKD8pDIRIcFWSzeHUCY'
```

