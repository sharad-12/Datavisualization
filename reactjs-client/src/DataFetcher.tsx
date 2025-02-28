import { ReactNode } from 'react';
import { useCubeQuery } from '@cubejs-client/react';
import { Query, ResultSet } from '@cubejs-client/core';

interface DataFetcherProps {
  query?: Query;
  children?: (props: {
    resultSet: ResultSet;
  }) => ReactNode;
  subscribe?: boolean;
}

export function DataFetcher(props: DataFetcherProps) {
  const { children, query, subscribe } = props;
  const { resultSet, isLoading, error } = useCubeQuery(query ?? {}, { subscribe, skip: !query });

  if (isLoading) {
    return <>Processing...</>;
  }

  if (error) {
    return <>{error.toString()}</>;
  }

  if (!resultSet) {
    return <>No Data Found</>;
  }

  return children?.({ resultSet }) || null;
}
