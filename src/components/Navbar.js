import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalcontext } from '../ContextAPI';

const Navbar = () => {
	const { Credentials } = useGlobalcontext();
	return (<>
		<header className="site-header sticky-top">
			<nav style={{ backgroundColor: "rgb(16, 17, 58)" }}
				className="mx-2 my-1 rounded navbar navbar navbar-expand-lg navbar-dark  ">
				<Link to='/' className="ms-2 navbar-brand">
					<span className="container navbar-brand">
						Collections
					</span>
				</Link>

				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarSupportedContent">

						<ul className="me-auto navbar-nav mb-2 mb-lg-0">
							<li className="nav-item">
								<a target="blank" className="nav-link" href="#">
									GitHub
								</a>
							</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">Home</Link>
							</li>

							<li className="nav-item">
								<Link to="/report/add" className="nav-link">Add-Report</Link>
							</li>
							<li className="nav-item">
								<Link to="/report/view" className="nav-link">View-Report</Link>
							</li>
						</ul>

						{Credentials &&
							<form className="d-flex justify-content-center">
								<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
								<button className="btn btn-outline-success" type="submit">
									<i className="bi bi-search"></i>
								</button>
							</form>
						}

						{!Credentials &&
							// i.e., if logged out then credentials is empty hence `!Credentials` is True
							<a className="ms-3 btn btn-outline-primary" href='/login'>Login</a>
						}
						{!Credentials &&
							<a className="ms-3 btn btn-outline-warning" href='/register'>Register</a>
						}
					</div>
				</div>
			</nav>
		</header>
	</>)
}

export default Navbar;