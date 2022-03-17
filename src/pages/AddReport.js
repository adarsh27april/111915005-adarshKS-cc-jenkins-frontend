import React, { useEffect, useState } from 'react'
import { useGlobalcontext } from '../ContextAPI';

const AddReport = () => {
	const [Err, setErr] = useState(null)
	const { server_url, setCredentials } = useGlobalcontext()

	const [Employee, setEmployee] = useState(
		{
			employeeID: '',
			jobRole: "",
			monthlySalary: '',
			yearlyBonus: '',
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

		fetch(`${server_url}/report/add`, {
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
			}).catch((err) => { console.log("err", err) })
	}

	return (<>
		<h1>Add Report</h1>
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

			<label htmlFor='jobRole'>jobRole : </label>
			<input type='text' id='jobRole' name='jobRole'
				value={Employee.jobRole}
				onChange={handleChange}
			/>
			<br /><br />

			<label htmlFor='monthlySalary'>monthlySalary : </label>
			<input type='text' id='monthlySalary' name='monthlySalary'
				value={Employee.monthlySalary}
				onChange={handleChange}
			/>
			<br /><br />

			<label htmlFor='yearlyBonus'>yearlyBonus : </label>
			<input type='text' id='yearlyBonus' name='yearlyBonus'
				value={Employee.yearlyBonus}
				onChange={handleChange}
			/>
			<br /><br />

			<button className='btn btn-outline-primary' type='submit'>Submit</button>
		</form>
	</>)
}

export default AddReport;
