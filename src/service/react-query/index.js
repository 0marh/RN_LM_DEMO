/* eslint-disable valid-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import {QueryClient, QueryClientProvider} from 'react-query';

/**
 * -----------------------------------------------------------------------------
 * Setup the app React Query Client
 */
export const queryClient = new QueryClient();

/**
 * -----------------------------------------------------------------------------
 * Wrapper around the app to provide global access to the react query client.
 */
export function AppQueryProvider({children}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

AppQueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
