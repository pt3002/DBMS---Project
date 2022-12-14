import React from 'react';
// import "./AddInterviewQuestions.css"
import Main from '../layouts/Main';
import { useState, useEffect } from 'react';
import Select from 'react-select';

const AddInterviewQuestions = () => {

    const [inputs, setInputs] = useState({});
    let [companies, setcompany] = useState([])

    // console.log(id); 
    const getdata = async () => {
        const mis = localStorage.getItem("mis")
        console.log("mis is ", mis)
        let url = `http://localhost:3001/posts/getcompany/${mis}`;
        let data = await fetch(url);
        // console.log(data);
        let parsedata = await data.json();
        // console.log(parsedata)
        setcompany(parsedata)
        // console.log(companies)
    }
    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        // console.log(companies);
    }, [companies]);

    let company_lst = []
    // let company_lst = []
    companies.forEach((item) => {
        let tmp = { "label": item.company_name, "value": item.company_name }
        company_lst.push(tmp)
    })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
        // setInputs(values => ({ ...values, ["mis"]: "112003117", ["company_name"]: Select.value }));
        setInputs(values => ({ ...values, ["mis"]: localStorage.getItem("mis"), ["company_name"]: Select.value }));
    }

    const handleSubmit = async (event) => {
        // event.preventDefault();
        console.log(inputs);
        console.log(inputs);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        };
        let url = `http://localhost:3001/posts/questions`;
        let data = await fetch(url, requestOptions);
        console.log(data);
        let parsedata = await data.json();
        console.log(parsedata)
        // alert(inputs);
        alert(parsedata["status"]);
    }

    return (<Main>
        <h1>Questions Asked</h1>
        <div style={(localStorage.getItem("mis") >= 112100000 ? {} : { display: "none" })}>
            <br />
            <h5>Available only if you appeared for an Interview</h5>
            <br />
        </div>
        <form className="form" onSubmit={handleSubmit} action="/add-interview-questions">
            <fieldset {...(localStorage.getItem("mis") >= 112100000 ? { disabled: 'disabled' } : {})}>
                <br />
                <div className="form-group">
                    <label htmlFor="company_name">Company Name</label>
                    <Select
                        className="drop-down"
                        options={company_lst}
                        name="company_name"
                        onChange={opt => Select.value = opt.value}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="question_tag">Question Type</label>
                    <br />
                    <input type="radio" name="question_tag" value="dsa" id="dsa" onChange={handleChange}></input>
                    <label htmlFor="dsa">Dsa</label>
                    <input type="radio" name="question_tag" value="core" id="core" onChange={handleChange}></input>
                    <label htmlFor="core">Core</label>
                    <input type="radio" name="question_tag" value="hr" id="hr" onChange={handleChange}></input>
                    <label htmlFor="hr">HR</label>
                </div>
                <br />

                <div className="form-group">
                    <label htmlFor="question_description">Question</label>
                    <input name="question_description" id="question_description" type="text" className="form-control" value={inputs.question_description || ""} onChange={handleChange} />
                </div>
                <br />

                <div>
                    <br />
                </div>
                <button className="button">Add</button>
            </fieldset>
        </form>
    </Main>)
};

export default AddInterviewQuestions;
