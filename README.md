# Allergy Management System

Allergy Management System (AMS) is simple CRUD application created to showcase the learning about the NodeJS, React, DB and CI/CD. The main purpose of this application is to create the simple application to learn about the new technology.

### Technology

- NodeJS
- PostgreSQL
- ReactJS

### Installation

To run this application, follow the following steps.

1. Clone the repository from this [link](https://github.com/azens1995/ams-backend.git)
2. After cloning the repository, open the repository in your any favorite code editor (VS Code).
3. Install the dependencies by running the command `npm install`. This will install all the required dependencies.
4. Make sure you have installed the Postgres Database in your local machine. Table creation will be automatic once the application is run, by sequelize.
5. Create a database of your choice.
6. Create and update the `.env` file based on the required configurations
7. Run the application with command `npm run dev`.

### Features

To use the application, user must be logged in into the system to add the allergy.
For registration, simple email, password along with first name and last name is required.
After registration, user can use the registered email and password to login into the system.
JWT token is being used for authentication purpose.

- [x] Registration
- [x] Login
- [x] Refresh Token
- [x] Create, Update, Delete Allergy
- [x] Upload image
- [ ] Unit tests
- [ ] Swagger Integrations

### Postman Link

Here's the postman link for the available [endpoints](https://www.postman.com/bold-star-49258/workspace/ams/collection/2611707-060428f4-6fd0-4cb5-b0e3-af2c6e1d8160?action=share&creator=2611707)

### Migrations

Sequelize migration has been used for managing the database migrations. Updating table becomes easier with the introduction of the migration tools.

To use sequelize-migration, follow the following steps:

1. Create migration file

```
npx sequelize-cli migration:create --name modify_table_add_new_fields
```

2. Run Migration

```
npx sequelize-cli db:migrate
```
