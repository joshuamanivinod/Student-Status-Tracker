import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();

const ContextProvider = ({ children }) => {
  const [userAdd, setUserAdd] = useState("");
  const [update, setUpdate] = useState("");
  const [deletedata, setdeletedata] = useState("");
  return (
    <>
      <addData.Provider value={{ userAdd, setUserAdd }}>
        <updateData.Provider value={{ update, setUpdate }}>
          <dltdata.Provider value={{deletedata, setdeletedata}}>
            {/* we added provider because we define a state and value of it is added to every component*/}
            {children}
          </dltdata.Provider>
        </updateData.Provider>
      </addData.Provider>
    </>
  );
};

export default ContextProvider;
