import cube, { PivotConfig, Query } from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import WebSocketTransport from '@cubejs-client/ws-transport';
import { Chart } from './Chart.tsx';
import { extractHashConfig } from './appConfig.ts';
import { DataFetcher } from './DataFetcher.tsx';
import { ChartType, Config } from './types';

function App() {
  const { apiUrl, apiToken, query, pivotConfig, useWebSockets, useSubscription } = extractHashConfig(
    {
      apiUrl: import.meta.env.VITE_CUBE_API_URL || '',
      apiToken: import.meta.env.VITE_CUBE_API_TOKEN || '',
      query: JSON.parse(import.meta.env.VITE_CUBE_QUERY || '{}') as Query,
      pivotConfig: JSON.parse(
        import.meta.env.VITE_CUBE_PIVOT_CONFIG || '{}'
      ) as PivotConfig,
      chartType: import.meta.env.VITE_CHART_TYPE as ChartType,
      websockets: import.meta.env.VITE_CUBE_API_USE_WEBSOCKETS === 'true',
      subscription: import.meta.env.VITE_CUBE_API_USE_SUBSCRIPTION === 'true',
    } as Config
  );

  let transport = undefined;

  if (useWebSockets) {
    transport = new WebSocketTransport({ authorization: apiToken, apiUrl });
  }

  const cubeApi = cube(apiToken, { apiUrl, transport });

  return (
    <>
      <CubeProvider cubeApi={cubeApi}>
        <DataFetcher query={query} subscribe={useSubscription}>
          {({ resultSet }) => {
            return (
              <Chart
                // chartType={chartType}
                resultSet={resultSet}
                pivotConfig={pivotConfig}
              />
            );
          }}
        </DataFetcher>
      </CubeProvider>
    </>
  );
}

export default App;
