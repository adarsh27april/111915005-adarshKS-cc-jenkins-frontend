import React, { useContext, useState } from 'react';

export const Context = React.createContext();
export const ContextAPI = (props) => {
    const server_url = `http://localhost:8430`;

    const [Credentials, setCredentials] = useState(null);
    // const [Credentials, setCredentials] = useState('adarsh');

    return (
        <Context.Provider
            value={{
                server_url,
                Credentials, setCredentials
            }}
        >
            {props.children}
        </Context.Provider>
    );
};


export const useGlobalcontext = () => {
    return useContext(Context);
}
