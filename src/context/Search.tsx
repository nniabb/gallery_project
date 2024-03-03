import React, { createContext, useContext, useState, ReactNode } from 'react';

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;