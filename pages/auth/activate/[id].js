import {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import {withRouter} from 'next/router';


import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import Layout from '../../../components/Layout'
import {API} from '../../../config'

const ActivateAccount = ({router}) => {
    const [state, setState] = useState({
        name: '',
        token: '',
        buttonText: 'Activate Account',
        success: '',
        error: ''
    })

    const {name, token, buttonText, success, error} = state

    useEffect(() => {
        let token = router.query.id
        if (token) {
            const { name } = jwt.decode(token)
            setState({
                ...state,
                name,
                token
            })
        }
    }, [router])

    const clickSubmit = async e => {
        e.preventDefault()
        //console.log('Activate Account')
        setState({
            ...state,
            buttonText: 'Activating'
        })

        try {
            const response = await axios.post(`${API}/register/activate`, {
                token
            })
            //    console.log('account activate response')
            setState({
                ...state,
                name: '',
                token: '',
                buttonText: 'Activated',
                success: response.data.message
            })
        } catch (error) {
            console.log(error)
            setState({
                ...state,
                error: response.data.message,
                buttonText: 'Account Activate'
            })
        }
    }

    return (<Layout>
                <div className="row">
                    <div className="col-md-6 ffset-md-3">
                        <h1>Good Day {name}, Ready to activate your account</h1>
                        <br />
                        {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                        <button className="btn btn-outline-warning btn-block" onClick={clickSubmit}>{buttonText}</button>
                    </div>
                </div>
            </Layout>)
}

export default withRouter(ActivateAccount)