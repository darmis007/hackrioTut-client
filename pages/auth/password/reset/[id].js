import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import Router from "next/router";
import { withRouter } from "next/router";

import {
  showSuccessMessage,
  showErrorMessage,
} from "../../../../helpers/alerts";
import Layout from "../../../../components/Layout";
import { API } from "../../../../config";

const ResetPassword = ({ router }) => {
  const [state, setState] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset Password",
    success: "",
    error: "",
  });

  const { name, token, newPassword, buttonText, success, error } = state;

  useEffect(() => {
    const decoded = jwt.decode(router.query.id);
    if (decoded)
      setState({ ...state, name: decoded.name, token: router.query.id });
  }, [router]);

  const handleChange = (e) => {
    setState({ ...state, newPassword: e.target.value, success: "", error: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Sending" });
    //console.log('Post Email to ', email)
    //setState({...state, email:''})
    try {
      const response = await axios.put(`${API}/reset-password`, {
        resetPasswordLink: token,
        newPassword,
      });
      //console.log('FORGOT PASSWORD', response)
      setState({
        ...state,
        email: "",
        newPassword: "",
        buttonText: "Done",
        success: response.data.message,
        error: "",
      });
    } catch (error) {
      console.log("Reset Password Error ", error);
      setState({
        ...state,
        buttonText: "Reset Password",
        error: error.response.data.error,
        success: "",
      });
    }
  };
  const resetPasswordForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={handleChange}
            value={newPassword}
            placeholder="Type your New Password"
            required
          />
        </div>
        <div>
          <button className="btn btn-outline-warning">{buttonText}</button>
        </div>
      </form>
    );
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1> Reset Password </h1>
          <br />
          {success && showSuccessMessage(success)}
          {error && showErrorMessage(error)}
          <br />
          {resetPasswordForm()}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
