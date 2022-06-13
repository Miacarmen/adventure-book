import React, { useState } from "react";
import Nav from "./components/Navbar/navbar";
import Foot from "./components/Footer/footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import AddPost from "./pages/AddPost";
import ViewPost from "./pages/ViewPost";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditPost from "./pages/EditPost";
import "./App.css";

import Menu from './components/Navbar/navMenu';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  const [dummy, setDummy] = useState();
  const resetDummyState = React.useCallback(() => setDummy({}), []);

  return (
    <ApolloProvider client={client}>
    <Router forceRefresh={true}>
      <div key={dummy} className="pageContainer">
        {/* <Nav /> */}
    <Nav refresh={resetDummyState} />
        <Routes>
          <Route path="/" element={<Home refresh={resetDummyState}/>} />
          <Route path="/login" element={<Login refresh={resetDummyState} />} />
          <Route path="/signup" element={<Signup refresh={resetDummyState} />} />
          <Route path="/about" element={<About refresh={resetDummyState} />} />
          <Route path="/contact" element={<Contact refresh={resetDummyState} />} />
          <Route path="/explore/viewpost/:postId" element={<ViewPost refresh={resetDummyState} />} />
          <Route path="/addpost" element={<AddPost refresh={resetDummyState} />} />
          <Route path="/dashboard/editpost/:postId" element={<EditPost refresh={resetDummyState} />} />
          <Route path="/dashboard" element={<Dashboard key={dummy} dummy={dummy} refresh={resetDummyState} />} />
          <Route path="/explore" element={<Explore refresh={resetDummyState} />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
    
        <Foot />
      </div>
    </Router>
    </ApolloProvider>
  );
}
