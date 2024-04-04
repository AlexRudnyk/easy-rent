"use client";

import {
  ReactNode,
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextProps {
  isAddAdvertModalOpen: boolean;
  setIsAddAdvertModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<ContextProps>({
  isAddAdvertModalOpen: false,
  setIsAddAdvertModalOpen: (): void => {},
});

export function AppContextWrapper({ children }: { children: ReactNode }) {
  const [isAddAdvertModalOpen, setIsAddAdvertModalOpen] =
    useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isAddAdvertModalOpen,
        setIsAddAdvertModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
