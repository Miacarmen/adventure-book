# **adventure-book**

ADD BADGES

**[See the live site here](https://fathomless-savannah-08300.herokuapp.com/)**

ADD LOGO HERE


## **Table Of Contents**

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Main Features](#main-features)
    - [Homepage](#homepage)
    - [Login/Signup](#login)
    - [Explore Page](#explore-page)
    - [Dashboard](#dashboard)
    - [Edit Post](#edit-post)
    - [Add Post](#add-post)
    - [View Post](#view-post)
5. [Technologies Used](#technologies-used)
6. [Authors](#author)
7. [License](#license)

## **Description**

Adventure Book is a modern web application used for travelers who want to get a better understanding of the "must see" places when traveling. Instead of digging through a bunch of separate blogs, travel agents, or websites to find the best spots while traveling, Adventure Book offers the user to create and explore different posts from past travelers, linked by tags. This gives the user a chance to find the less touristy places and understand the worlds culture all that much more in a simple, yet highly effective way.
  
## **Installation**

1. Clone down the repo from [the repository](git@github.com:CommieDog/adventure-book.git) or by `git clone git@github.com:CommieDog/adventure-book.git` in your terminal
2. To get all necessary packages, run `npm install` in the command line
5. Then run `npm run develop` to get the program to concurrently run the front and back end of the web application.
 
 Please note Node.js is required for this application to run locally.

## **Usage**

 This web app was deployed using Heroku. Reference the following video for full usage of the web app.

 ADD GIF HERE

## **Main Features**

The following sections highlight the functionality of the main pages and components of Adventure Book.

### **Homepage**

### **Login**

NOTE: add balloon code snipps

### **Explore Page**

### **Dashboard**

The dashboard of Adventure Book is only visible when the user is logged in. Upon log in, the user can navigate to dashboard from the navbar or footer. Here, is a place to view the current posts the user has already made and view any posts they have saved from other users. They can create, view or delete there posts from here as well. Reference picture below for layout of the dashboard.


<img src= "./client/src/images/dashboard%20photo.PNG" height="200px" width="400px">

### **Edit Post**

From the dashboard, the user can choose to edit their post which will redirect to the edit post page. Here the user has access to update the title, tags, or description of the post they are trying to edit. The user will not have access to update anything else.

ADD GIF SHOWING FUNCTIONALITY OF EDIT POST

### **Add Post**

The add post page is meant to only be rendered when accessed through the user Dashoboard. This is so it is seen from their personal page as a design preference. Add post was designed with some new technologies, like Cloudinary. Cloudinary was the solution to not storing all the picture storing all our pictures in the server and caching the images. It is a spot where all the pictures will be stored to be used for the site, making it less code to work with. The implementation of Cloudinary was very simple and easy to use as shown below.

``` const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload-preset", "qufwrwdm");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dw5epcgjt/image/upload",
      {
        method: "post",
        body: data,
      }
      );
      const file = await res.json();
      setImage(file.secure_url);
      setLoading(false);
    };
```

The only places where Cloudinary is called on is the `data.append("upload_preset", "kyliedefault")` which is setting the upload preset to an unsigned token, and `"https://api.cloudinary.com/v1_1/dw5epcgjt/image/upload"` which is where it will send the image.

Once all of this is complete and the user submits the new post, the page will render back to the Dashboard.

Video below to reference adding a post

![add post gif](./client/src/images/addpostgif.gif)

### **View Post**



## **Technologies Used**

### **Packages**
* [Concurrently](https://www.npmjs.com/package/concurrently)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [React Image Carousel](https://www.npmjs.com/package/react-simple-image-slider)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

### **Languages**
* [JavaScript](https://www.javascript.com/)
* [HTML5](https://html.com/html5/)
* [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS)
* [GraphQL](https://graphql.org/)

### **Third Party API**
* [BingMaps]()
* [Cloudinary](https://cloudinary.com/documentation)

### **Frameworks**
* [ReactJS](https://reactjs.org/)
* [NodeJS](https://nodejs.org/en/) 
* [JWT](https://jwt.io/)
* [Express](https://expressjs.com/)

### **CSS Frameworks**
* [Tailwind CSS](https://tailwindcss.com/docs/installation)
* [Font Awesome](https://fontawesome.com/)
* [daisyUI](https://daisyui.com/)

### **Libraries**
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [React Router](https://reactrouter.com/)
* [Code Pen](https://codepen.io/)
* [Mongoose](https://mongoosejs.com/docs/middleware.html)



## **Authors**

* [John Netzel](https://github.com/CommieDog)
* [Mia Carmen](https://github.com/Miacarmen)
* [Kylie Shinn](https://github.com/kyliemshinn)

## **License**

Adventure Book is available under the MIT license. For licensing details see License document.