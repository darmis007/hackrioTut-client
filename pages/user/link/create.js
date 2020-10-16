//imports
import {useEffect, useState} from 'react'
import axios from 'axios'

import Layout from '../../../components/Layout'
import {API} from '../../../config'
//import withUser from '../../withUser'
import {showSuccessMessage, showErrorMessage} from '../../../helpers/alerts'
import { getCookie, isAuth } from '../../../helpers/auth'

const Create = ({token}) => {
    //state
    const [state, setState] = useState({
        title:'',
        url:'',
        categories:[],
        loadedCategories:[],
        success:'',
        error:'',
        type:'',
        medium:''
    })

    const {title,url,categories,loadedCategories,success,error,type,medium} = state

    // load Categories when component mounts using useEffect

    useEffect(() => {
        //effect
        loadCategories()
    }, [success])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/category`)
        setState({...state, loadedCategories:response.data})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        //console.log({title, url, categories, type, medium})
        try {
            const response = await axios.post(`${API}/link`,{title, url, categories, type, medium},
            {headers: {
                Authorization : `Bearer ${token}`
            }})
            setState({...state, title:'', url:'', success:'Link is created', error:'', loadedCategories:[], categories:[], type:'', medium:''})
        } catch (error) {
            console.log('LINK SUBMIT ERROR', error)
            setState({...state, error: error.response.data.error})
        }
    }

    const handleTitleChange = async e => {
        setState({...state, title:e.target.value, error:'', success:''})
    }

    const handleURLChange = async e => {
        setState({...state, url:e.target.value, error:'', success:''})
    }
    // Submit Link Form
    const submitLinkForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" onChange={handleTitleChange} value={title}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">URL</label>
                <input type="url" className="form-control" onChange={handleURLChange} value={url}></input>
            </div>
            <div>
    <button disabled={!token} className="btn btn-outline-warning" type="submit">{isAuth() || token ? 'Post':'Login to Post'}</button>
            </div>
        </form>
    )

    const handleToggle = c => () => {
        // return the first index or -1
        const clickedCategory = categories.indexOf(c)
        let all = [...categories]

        if(clickedCategory == -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        console.log("all >> categories", all)
        setState({...state, categories:all, success:'', error:''})
    }

    // show categories
    const showCategories = () => {
        return loadedCategories && loadedCategories.map((c,i) => (
            <li className="list-unstyled" key={c._id}>
                <input type="checkbox" onChange={handleToggle(c._id)} className="mr-2"></input>
        <label className="form-check-label">{c.name}</label>
            </li>
        ))
    }

    const handleTypeClick = e => {
        setState({...state, type:e.target.value, error:'', success:''})
    }

    // show type
    const showTypes = () => (
        <React.Fragment>
            <div className="form-check ml-3" type="check">
                <label className="form-check-label">
                    <input type="radio" 
                    onClick={handleTypeClick} 
                    checked={type=="free"} 
                    value="free" 
                    className="form-check-input"></input>Free</label>
            </div>
            <div className="form-check ml-3" type="check">
                <label className="form-check-label">
                    <input type="radio" 
                    onClick={handleTypeClick} 
                    checked={type=="paid"} 
                    value="paid" 
                    className="form-check-input"></input>Paid</label>
            </div>
        </React.Fragment>
    )

    const handleMediumClick = e => {
        setState({...state, medium:e.target.value, error:'', success:''})
    }

    const showMediums = () => (
        <React.Fragment>
            <div className="form-check ml-3" type="check">
                <label className="form-check-label">
                    <input type="radio" 
                    onClick={handleMediumClick} 
                    checked={medium=="video"} 
                    value="video" 
                    className="form-check-input"></input>Video</label>
            </div>
            <div className="form-check ml-3" type="check">
                <label className="form-check-label">
                    <input type="radio" 
                    onClick={handleMediumClick} 
                    checked={medium=="book"} 
                    value="book" 
                    className="form-check-input"></input>Book</label>
            </div>
        </React.Fragment>
    )


    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <h1>Submit Link/URL</h1>
                    <br />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="form-group">
                        <label className="text-muted ml-4">Category</label>
                        <ul style={{maxHeight: '100px', overflowY: "scroll"}}>{showCategories()}</ul>
                    </div>
                    <div className="form-group">
                        <label className="text-muted ml-4">Type</label>
                        <ul style={{maxHeight: '100px', overflowY: "scroll"}}>{showTypes()}</ul>
                    </div>
                    <div className="form-group">
                        <label className="text-muted ml-4">Medium</label>
                        <ul style={{maxHeight: '100px', overflowY: "scroll"}}>{showMediums()}</ul>
                    </div>
                </div>
                    <div className="col-md-8">
                        {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                        {submitLinkForm()}
                    </div>
            </div>
        </Layout>
    ) ;
}

Create.getInitialProps = ({req}) => {
    const token = getCookie('token', req)
    return {token}
}

export default Create