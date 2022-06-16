import React, {createContext, useState, useMemo, useContext} from 'react';

const PropertyContext = createContext();

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('PropertyContext must be used with PropertyProvider!');
  }
  return context;
}

export const PropertyProvider = ({children}) => {
  const [propertiesList, setPropertiesList] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const propertiesListVal = useMemo(
    () => ({propertiesList, setPropertiesList}),
    [propertiesList],
  );
  const selectedPropertyVal = useMemo(
    () => ({selectedProperty, setSelectedProperty}),
    [selectedProperty],
  );

  return (
    <PropertyContext.Provider value={{selectedPropertyVal, propertiesListVal}}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;
