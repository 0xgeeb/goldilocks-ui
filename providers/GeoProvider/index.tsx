"use client";

import {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

const INITIAL_STATE = {
  signed: "FALSE",
  changeSigned: (_toggle: string) => {},
};

const GeoContext = createContext(INITIAL_STATE);

export const GeoProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const [signedState, setSignedState] = useState<string>(INITIAL_STATE.signed);

  useEffect(() => {
    checkSigned();
  }, []);

  const changeSigned = (toggle: string) => {
    localStorage.setItem("signed", toggle);
    setSignedState(toggle);
  };

  const checkSigned = () => {
    const storedSigned = localStorage.getItem("signed");
    if (storedSigned === "TRUE") {
      setSignedState(storedSigned);
    } else {
      setSignedState("FALSE");
    }
  };

  return (
    <GeoContext.Provider
      value={{
        signed: signedState,
        changeSigned,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
};

export const useGeo = () => useContext(GeoContext);
