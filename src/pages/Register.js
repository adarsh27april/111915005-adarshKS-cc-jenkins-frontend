import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalcontext } from '../ContextAPI';

const Register = () => {
	const [Err, setErr] = useState(null)
	const navigate = useNavigate();
	const { server_url, setCredentials } = useGlobalcontext()

	const [Employee, setEmployee] = useState(
		{
			employeeID: '',
			firstName: "",
			lastName: "",
			dateOfBirth: "",
			contactNumber: '',
			password: "",
		}
	)

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setEmployee({ ...Employee, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(server_url)
		fetch(`${server_url}/users/register`, {
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
		<h1>Register</h1>
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

			<label htmlFor='firstName'>firstName : </label>
			<input type='firstName' id='firstName' name='firstName'
				value={Employee.firstName}
				onChange={handleChange}
			/>
			<br /><br />

			<label htmlFor='lastName'>lastName : </label>
			<input type='lastName' id='lastName' name='lastName'
				value={Employee.lastName}
				onChange={handleChange}
			/>
			<br /><br />

			<label htmlFor='dateOfBirth'>dateOfBirth : </label>
			<input type='dateOfBirth' id='dateOfBirth' name='dateOfBirth'
				value={Employee.dateOfBirth}
				onChange={handleChange}
			/>
			<br /><br />

			<label htmlFor='contactNumber'>contactNumber : </label>
			<input type='contactNumber' id='contactNumber' name='contactNumber'
				value={Employee.contactNumber}
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

export default Register;