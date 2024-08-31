<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/hasbialwikusmana/Blanja-Frontend" targer="_blank">
    <img src="https://github.com/user-attachments/assets/c3e6b400-4cba-4d23-958f-2339700b2e56" alt="Logo" width="100%">
  </a>

  <h3 align="center">Blanja</h3>

  <p align="center">
 Blanja is an online fashion store that offers fashion products.
    <br />
    <a href="https://blanjastore.netlify.app/" target="_blank">View Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

**Blanja** is an online store designed to facilitate the sale of products through the web. The application allows users to browse various products, add products to the catalog, update product information, delete products, and conduct online sales transactions.

This website was developed individually by Hasbi, using React.js, Express.js, and PostgreSQL as the database to store and manage product and transaction information.

## Features

- **Product Management**: Allows for the addition, update, and deletion of product listings. Admins can manage product details, including descriptions, prices, and images.

- **User Authentication**: Secure authentication system using JSON Web Tokens (JWT) for both users and administrators. Includes login, registration, and password recovery functionalities.

- **Order Processing**: Handles customer orders from placement through to completion, including order status updates and transaction history.

- **Image Management**: Integration with Cloudinary for storing and serving product images, ensuring fast and reliable image delivery.

- **Category Management**: Organizes products into categories for easier browsing and searching by users.

- **Search and Filtering**: Provides search and filtering capabilities to help users find products quickly based on various criteria.

- **Responsive API**: RESTful API endpoints for seamless integration with the Blanja frontend and other services.

- **Database Management**: Utilizes PostgreSQL for reliable and scalable data storage, including user data, product information, and transaction records.

- **Error Handling**: Comprehensive error handling and logging to ensure smooth operation and easy troubleshooting.

- **Security Features**: Implements best practices for securing data and interactions, including JWT-based authentication and secure data storage.

- **Documentation**: Includes API documentation for easy integration and usage with tools like Postman.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This app was built with some technologies below:

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [NodeJS](https://nodejs.org/)
- [Cloudinary](https://cloudinary.com/)
- [JSON Web Token (JWT)](https://jwt.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [NodeJs](https://nodejs.org/en/download/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

- Clone the repo

```
git clone https://github.com/hasbialwikusmana/Blanja-Backend.git
```

- Go To Folder Repo

```
cd Blanja-Backend
```

- Install Module

```
npm install
```

- <a href="#setup-env">Setup .env</a>
- Import Database in folder doc

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Create .env file in your root project folder.

```
#DATABASE POSTGRESQL

# PGHOST= Hostname of Database Server
PGHOST=

# PGUSER= Username for Database
PGUSER=

# PGDATABASE= Database Name
PGDATABASE=

# PGPASSWORD= Password for Database
PGPASSWORD=

# PGPORT= Port of Database Server
PGPORT=


# TOKEN
SECRET_KEY_JWT =

#PORT SERVER
PORT =

#Cloudinary
CLOUD_NAME =

CLOUD_API_KEY =

CLOUD_API_SECRET =

```

<p align="right">(<a href="#top">back to top</a>)</p>

## Rest API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/27670180/2sAXjF8uy1)

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project

:rocket: [`Backend Blanja`](https://github.com/hasbialwikusmana/Blanja-Backend)

:rocket: [`Frontend Blanja`](https://github.com/hasbialwikusmana/Blanja-Frontend)

:rocket: [`Web Service`](https://blanja-backend.vercel.app/)

:rocket: [`Demo Blanja`](https://blanjastore.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

My Email : [hasbialwi70@gmail.com](mailto:hasbialwi70@gmail.com)

Project Link: [https://github.com/hasbialwikusmana/Blanja-Frontend](https://github.com/hasbialwikusmana/Blanja-Frontend)

<p align="right">(<a href="#top">back to top</a>)</p>
