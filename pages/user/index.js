import Layout from "../../components/Layout";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";

import axios from "axios";
import { useEffect, useState } from "react";

// **Important Note** //
// Data is loaded with the components - Good for SEO
// This method runs in the server first hence sends a populated page
// This method would run once only on server side and everytime one goes on client side it doesnt request the server again

const User = ({ user, token }) => (
  <Layout>{JSON.stringify(user, token)}</Layout>
);

export default withUser(User);

// **Important Note** //
// Data is loaded when component mounts, check Page Source, not good for SEO
//const User = () => {
//    const [todos, setTodos] = useState([])
//    useEffect(() => {
//        axios.get('https://jsonplaceholder.typicode.com/todos')
//        .then(response => setTodos(response.data))
//    }, [])
//    return <Layout>{JSON.stringify(todos)}</Layout>
//}
