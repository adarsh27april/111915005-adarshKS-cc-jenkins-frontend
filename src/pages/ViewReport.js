import React, { useEffect, useState } from 'react'
import { useGlobalcontext } from '../ContextAPI';

const AddReport = () => {
	const [Err, setErr] = useState(null)
	const { server_url, setCredentials } = useGlobalcontext()
	const [Data, setData] = useState(null);

	const [Employee, setEmployee] = useState(
		{
			employeeID: 0,
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

		fetch(`${server_url}/report/read/${Employee.employeeID}`, {
			method: 'GET',
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
				setData(data);
				console.log("data: ", data);
			}).catch((err) => { console.log("err", err) })
	}

	return (<>
		<h1>View Report</h1>
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
			<button className='btn btn-outline-primary' type='submit'>Search</button>
		</form>
		<br /><br />

		{
			Data &&

			<div>

				Employee ID : {Data.employeeID}<br /><br />
				First Name: {Data.firstName}<br /><br />
				Last Name: {Data.lastName}<br /><br />
				Date Of Birth: {Data.dateOfBirth}<br /><br />
				Job Role: {Data.jobRole}<br /><br />
				Monthly Salary: {Data.monthlySalary}<br /><br />
				Yearly Bonus: {Data.yearlyBonus}<br /><br />
				Total Annual Salary: {Data.yearlyBonus + Data.monthlySalary}
			</div>
		}

	</>)
}

export default AddReport;
