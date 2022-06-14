# **adventure-book**

![js](https://img.shields.io/github/languages/top/CommieDog/adventure-book?style=plastic)
![languages](https://img.shields.io/github/languages/count/CommieDog/adventure-book)
![License](https://img.shields.io/github/license/CommieDog/adventure-book)
![issuesopen](https://img.shields.io/github/issues/CommieDog/adventure-book)
![forks](https://img.shields.io/github/forks/CommieDog/adventure-book)



### **See The Live Site [Here!](https://book-adventure.herokuapp.com/)**

<img src= "./client/src/images/logo.png" height="200px" width="200px">
    
      
## **Table Of Contents**

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Main Features](#main-features)
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

 This web app was deployed using [Heroku](https://www.heroku.com/). Reference the following video for full usage of the web app.

![full usage](./client/src/images/adventurebookfullgif.gif)

## **Main Features**

The following sections highlight the functionality of the main pages and components of Adventure Book.


### **Login**

The submit button was created with functionality from [animeJS](https://animejs.com/). To get the balloons to render on submit of either to signup or login form, the screen will delay redirect and display balloons floating through the screen. To get the to work as anticipated, we added the following lines of code to create time for this action.
```  
login(idToken) {
    setTimeout(function() {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/explore');
    }, 3000)
  }
```
With this, we were able to add what could be a simple login to something that fit the theme of the web app.

### **Explore Page**

The Explore page is the main component that the user will see when they login. This page showcases all the posts from any user within the site so the current user can view it for travel recommendations. Here we used a search bar to search any tag that a user has used in the past to get a unique search for what they want. The following code shows how this search bar was implemented.

```
  const [getFilteredPosts] = useLazyQuery(QUERY_POSTS_WITH_TAG);
  const [getUnfilteredPosts] = useLazyQuery(QUERY_POSTS);

  function requestSearch(criteria) {
    getFilteredPosts({
      variables: { tags: criteria },
    }).then((res) => {
      if (res.data.postsByTag) {
        setQueryData(res.data.postsByTag);
      }
    });
  }

  useEffect(() => {
    getUnfilteredPosts().then((res) => {
      if (res.data.posts) {
        setQueryData(res.data.posts);
      }
    });
  }, [getUnfilteredPosts]);

```


### **Dashboard**

The dashboard of Adventure Book is only visible when the user is logged in. Upon log in, the user can navigate to dashboard from the navbar or footer. Here, is a place to view the current posts the user has already made and view any posts they have saved from other users. They can create, view or delete there posts from here as well. Reference picture below for layout of the dashboard.


<img src= "./client/src/images/dashboard%20photo.PNG" height="200px" width="400px">

The dashboard also has a saved post component that allows the use to view favorite posts from other users so they can reference it at a later time. To get thi function running, we used created two functions to either add to the collection or remove from it. The following coded shows how this was implemented.

```
 async function addToUserCollection() {
    try {
      setColorToggle("red");
      await addToCollection({ variables: { postId: props.postId } });
      setCollected(true);
    } catch (err) {
      console.error(addError ? addError : err);
      setColorToggle("black");
    }
  }

 async function removeFromUserCollection() {
    try {
      setColorToggle("black");
      await removeFromCollection({ variables: { postId: props.postId } });
      setCollected(false);
    } catch (err) {
      console.error(removeError ? removeError : err);
      setColorToggle("red");
    }
```

### **Edit Post**

From the dashboard, the user can choose to edit their post which will redirect to the edit post page. Here the user has access to update the title, tags, or description of the post they are trying to edit. The user will not have access to update anything else.

<img src= "./client/src/images/updatepostAB.gif" height="200px" width="400px">

### **Add Post**

The add post page is meant to only be rendered when accessed through the user Dashboard. This is so it is seen from their personal page as a design preference. Add post was designed with some new technologies, like Cloudinary. Cloudinary was the solution to not storing all the picture storing all our pictures in the server and caching the images. It is a spot where all the pictures will be stored to be used for the site, making it less code to work with. The implementation of Cloudinary was very simple and easy to use as shown below.

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

The only places where Cloudinary is called on is the `data.append("upload_preset", "kyliedefault")` which is setting the upload preset to an unsigned token, and `"https://api.cloudinary.com/v1_1/dw5epcgjt/image/upload"` which is where it will send the images. To work Cloudinary only being able to upload one picture per call, we had to call it multiple times, capping it at 4 images per post to get an array of images.

Once all of this is complete and the user submits the new post, the page will render back to the Dashboard.

Video below to reference adding a post

<img src= "./client/src/images/addpostgif.gif" height="200px" width="400px">

### **View Post**

The final component to this web application was to view a single post. This was queried by the ID and got back all of the specific information the user would only be able to see at this page. The user viewing the post will be able to see all the pictures associated with the post, the description, the location on a map, comments, and a way to favorite the post to bring it to their own dashboard. The notable technologies used for this page was the Map and Image Carousel. The following lines of codes are how both were implemented.

```
            <SimpleImageSlider
              width={820}
              height={700}
              images={makeCarouselImageData(post.images)}
              showBullets={true}
              showNavs={true}
              overflow="hidden"
              className="slider"
            />
```

The Bing maps was also imported, making it very easy to implement into our web app for a better user experience.

```
            <Map
              height="600px"
              width="820px"
              center={[post.location.latitude, post.location.longitude]}
              locations={[[post.location.latitude, post.location.longitude]]}
              onClick={() => {}}
            />
```

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
* [animeJS](https://animejs.com/)
* [Mongoose](https://mongoosejs.com/docs/middleware.html)



## **Authors**

* [John Netzel](https://github.com/CommieDog)
* [Mia Carmen](https://github.com/Miacarmen)
* [Kylie Shinn](https://github.com/kyliemshinn)

## **License**

Adventure Book is available under the MIT license. For licensing details see License document.