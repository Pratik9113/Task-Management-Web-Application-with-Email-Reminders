import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const url = process.env.VITE_BASE_URL;
    const [token, setToken] = useState("");
    const contextValue = {
        token,
        setToken,
        url,

    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider