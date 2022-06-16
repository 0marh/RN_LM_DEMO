import {useQuery} from 'react-query';

import QUERY_KEYS from '../../../service/react-query/query-keys';
import {getCityProperties} from './api';

const useGetCityProperties = cityId => {
  const cityPropertiesQuery = useQuery(
    [QUERY_KEYS.GET_PROPERTIES, cityId],
    () => getCityProperties(cityId),
    {
      enabled: !!cityId,
      // staleTime: 1000 * 60 * 5,
    },
  );

  if (cityPropertiesQuery.error instanceof Error) {
    console.log('@cityPropertiesQuery error => ', {
      error: cityPropertiesQuery.error,
    });
  }

  return cityPropertiesQuery;
};

export default useGetCityProperties;
