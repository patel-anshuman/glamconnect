import React, { useState } from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { createContext } from 'react';

const Context = ({children}) => {

    const myContext = createContext();
    let [login,setLogin] = useState(false);

    let userLogin = () => {
        setLogin(true);
    }
    let userLogout = () => {
        setLogin(false);
    }
    return (
        <myContext.Provider value={{login, userLogin, userLogout}}>
            {children}
        </myContext.Provider>
  );
};

export default Context;
