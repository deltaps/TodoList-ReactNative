import React, {useState} from 'react';
import {RoleContext, TokenContext, UsernameContext} from './Context/Context'
import Navigation from './Navigation/Navigation';

export default function App() {
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState(null)
    const [role,setRole] = useState(null)

  return (
      <UsernameContext.Provider value={[username, setUsername]}>
        <TokenContext.Provider value={[token, setToken]}>
            <RoleContext.Provider value={[role,setRole]}>
                <Navigation />
            </RoleContext.Provider>
        </TokenContext.Provider>
      </UsernameContext.Provider>
  );
}
