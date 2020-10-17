import Layout from "../../components/Layout";
import { API } from "../../config";
import { getCookie } from "../../helpers/auth";
import withAdmin from "../withAdmin";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

// **Important Note** //
// Data is loaded with the components - Good for SEO
// This method runs in the server first hence sends a populated page
// This method would run once only on server side and everytime one goes on client side it doesnt request the server again

const Admin = ({ user }) => {
  return (
    <Layout>
      <h1> Admin Dashboard </h1>
      <br />
      <div className="col-md-4">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="/admin/category/create">
              <a className="nav-link">Create Category</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-md-8"></div>
    </Layout>
  );
};
export default withAdmin(Admin);

// **Important Note** //
// Data is loaded when component mounts, check Page Source, not good for SEO
//const Admin = () => {
//    const [todos, setTodos] = useState([])
//    useEffect(() => {
//        axios.get('https://jsonplaceholder.typicode.com/todos')
//        .then(response => setTodos(response.data))
//    }, [])
//    return <Layout>{JSON.stringify(todos)}</Layout>
//}
