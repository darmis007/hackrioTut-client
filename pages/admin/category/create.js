import Layout from '../../../components/Layout';
import { API } from '../../../config';
import { showSuccessMessage, showErrorMessage} from '../../../helpers/alerts';
import { getCookie } from '../../../helpers/auth'
import withAdmin from '../../withAdmin'

import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Create = ({user, token}) => {

    const [state, setState] = useState({
        name: '',
        content: '',
        error: '',
        success: '',
        formData: process.browser && new FormData(),
        buttonText: 'Create',
        imageUploadText:'Upload Image'
    })

    const { name, content, success, error, formData, buttonText, imageUploadText} = state


    const handleChange = name => e => {
        const value = name === "image"? e.target.files[0] : e.target.value
        const imageName = name === "image" ? event.target.files[0].name : "Upload Image"
        formData.set(name, value)
        setState({ ...state, [name]: value, imageUploadText: imageName, error: '', success: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setState({
            ...state,
            buttonText:'Creating'
        })
        //console.log(...formData)
        try {
            const response = await axios.post(`${API}/category`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Category Created RESPONSE", response)
            setState({
                ...state,
                name:'',
                content:'',
                formData:'',
                buttonText:'Created',
                imageUploadText: 'Upload Image',
                success:` Category created successfully`,
                error: ''
            })
        } catch (err) {
            console.log("CATEGORY ERROR, ",err)
            setState({
                ...state,
                name:'',
                buttonText:'Create',
                error:error.response.data.error,
                success:''
            })
        }
    }

    const createCategoryForm  = () => { return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <input onChange={handleChange('content')} type="text" className="form-control" value={content} required />
            </div>
            <div className="form-group">
                <label className="text-muted">Image</label>
                <input onChange={handleChange('image')} type="file" className="form-control" required />
            </div>
            <div>
                <button type="submit" className="btn btn-outline-warning">{buttonText}</button>
            </div>

        </form>
    )}

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <h1>Create Category</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {createCategoryForm()}
            </div>
        </Layout>
    )
}
export default withAdmin(Create);