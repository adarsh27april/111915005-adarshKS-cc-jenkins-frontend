import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalcontext } from '../ContextAPI';

const Login = () => {

	const [Employee, setEmployee] = useState({
		employeeID: 0,
		password: "",
	})

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setEmployee({ ...Employee, [name]: value });
	}

	const [Err, setErr] = useState(false)
	const navigate = useNavigate();
	const { server_url, setCredentials } = useGlobalcontext();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(server_url)
		fetch(`${server_url}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(Employee)
		})
			.then(async (res) => {
				if (!res.ok) {
					const { msg } = await res.json();
					console.log('handleErrors-> msg: ', msg)
					setErr(msg)
					throw Error(msg);
				}
				return res.json();
			})
			.then((data) => {
				console.log("data: ", data);
				setCredentials(data.firstName)
				navigate('/');
			})
			.catch((err) => {
				console.log("err", err)
			})
	}
	return (<>
		<h1>Login</h1>
		<br />

		{
			!Err ?
				'' :
				<div style={{ color: 'red', margin: '6px' }}>{Err}</div>
		}

		<form className='form' onSubmit={handleSubmit}>
			<label htmlFor='employeeID'>employeeID : </label>
			<input type='text' id='employeeID' name='employeeID'
				value={Employee.employeeID}
				onChange={handleChange}
			/>
			<br /><br />

			<label htmlFor='password'>password : </label>
			<input type='password' id='password' name='password'
				value={Employee.password}
				onChange={handleChange}
			/>
			<br /><br />

			<button className='btn btn-outline-primary' type='submit'>Submit</button>
		</form>
	</>)
}

export default Login;
