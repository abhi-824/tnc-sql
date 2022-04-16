## Setup on Local

Prerequisites:

- NodeJs
- PostgreSQL

1. Clone the repository and run `npm i`

2. Go to psql and run `CREATE DATABASE tnc`

3. Run `psql tnc < init.sql postgres` on terminal

4. Now run the server using `npm run dev`

5. Run seeds using `psql tnc < seed/seedUser.sql postgres`, `psql tnc < seed/seedProduct.sql postgres` and `psql tnc < seed/seedCategory.sql postgres`