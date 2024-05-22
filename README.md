# Invoice-Manager
This application allows users to create, view, update, and delete invoices.


## Installation

clone the repository

```bash
  git clone https://github.com/ermiasgw/Invoice-Manager.git
  cd Invoice-Manager
```

client Installation

```bash
  cd client
  npm install
  npm run dev
```

database setup

```bash
  docker run --name postgres-container -d -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root postgres:alpine
```


server Installation

```bash
  cd server
  npm install
  npx prisma migrate dev --name init
  npm run start:dev
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your client/.env file

`BACKEND_URL`

`SESSION_SECRET`


and for server/.env

`DATABASE_URL`

`SECRET`

