import {useQuery} from 'react-query';

import QUERY_KEYS from '../../../service/react-query/query-keys';
import {getPropertyDetails} from './api';

const useGetPropertyDetails = propertyId => {
  const propertyDetailsQuery = useQuery(
    [QUERY_KEYS.GET_PROPERTIES_DETAILS, propertyId],
    () => getPropertyDetails(propertyId),
    {
      enabled: !!propertyId,
      // staleTime: 1000 * 60 * 5,
    },
  );

  if (propertyDetailsQuery.error instanceof Error) {
    console.log('@propertyDetailsQuery error => ', {
      error: propertyDetailsQuery.error,
    });
  }

  return propertyDetailsQuery;
};

export default useGetPropertyDetails;
