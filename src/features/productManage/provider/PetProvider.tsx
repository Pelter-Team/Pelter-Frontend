import React, { createContext, useContext, ReactNode } from 'react';

export interface Card {
  name: string;
  type: string;
  description: string;
  isAdopt: boolean;
  updatedAt: string;
}

const CardsContext = createContext<Card[] | undefined>(undefined);

interface CardsProviderProps {
  children: ReactNode;
  cards: Card[];
}

export const CardsProvider = ({ children, cards }: CardsProviderProps) => {
  return (
    <CardsContext.Provider value={cards}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};
