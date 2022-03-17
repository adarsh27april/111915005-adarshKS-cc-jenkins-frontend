import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalcontext } from '../ContextAPI';
// import Collections from '../components/Collections';

const Welcome = () => {
    const { Credentials } = useGlobalcontext();
    return (<div>
        <h1>Welcome {Credentials}</h1>
        {/* {Credentials && <Collections />} */}
    </div>)
}

export default Welcome
