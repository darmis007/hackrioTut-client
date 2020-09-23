import {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import Router from 'next/router';
import {withRouter} from 'next/router';


import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Layout from '../../../components/Layout'
import {API} from '../../../config'

const ForgotPassword = () => {
    const [state, setState] = useState({
        email: '',
        buttonText: 'Forgot Password',
        success: '',
        error: ''
    })

    const {email, buttonText, success, error} = state

    const handleChange = e => {
        //console.log(e.target.value)
        setState({...state, email:e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        //console.log('Post Email to ', email)
        //setState({...state, email:''})
        try {
            const response = await axios.put(`${API}/forgot-password`,{email})
            //console.log('FORGOT PASSWORD', response)
            setState({
                ...state, email:'', buttonText: 'Done', success: response.data.message, error: ''
            })
        } catch (error) {
            console.log('Forgot Password Error ', error)
            setState({
                ...state, buttonText: 'Forgot Password', error: error.response.data.error, success: ''
            })
        }
    }

    const passwordForgotForm = () => {
        return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" 
                className = "form-control" 
                onChange = {handleChange} 
                value = {email} 
                placeholder="Type your email" required />
            </div>
            <div>
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
        )};

    return (
        <Layout>
            <div className='row'>
                <div className="col-md-6 offset-md-3">
                    <h1> Forgot Password </h1>   
                <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                <br />
                {passwordForgotForm()}
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword