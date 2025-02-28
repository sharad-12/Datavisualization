// import 'chart.js/auto';
// import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
// import { PivotConfig, ResultSet } from '@cubejs-client/core';
// import { type ChartType } from './types';

// interface ChartProps {
//   resultSet: ResultSet;
//   pivotConfig: PivotConfig;
//   chartType: ChartType;
// }

// export function Chart(props: ChartProps) {
//   const { resultSet, pivotConfig, chartType } = props;

//   const data = {
//     labels: resultSet.chartPivot(pivotConfig).map((row) => row.x),
//     datasets: resultSet.series(pivotConfig).map((item) => {
//       return {
//         fill: chartType === 'area',
//         label: item.title,
//         data: item.series.map(({ value }) => value)
//       };
//     }),
//   };

//   const ChartElement = {
//     area: Line,
//     bar: Bar,
//     doughnut: Doughnut,
//     line: Line,
//     pie: Pie
//   }[chartType as Exclude<ChartType, 'table'>];

//   return <ChartElement data={data} />;
// }
import { useState } from 'react';
import 'chart.js/auto';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { PivotConfig, ResultSet } from '@cubejs-client/core';

interface ChartProps {
  resultSet: ResultSet;
  pivotConfig: PivotConfig;
}

export function Chart({ resultSet, pivotConfig }: ChartProps) {
  const [selectedChart, setSelectedChart] = useState<'line' | 'bar' | 'pie' | 'all'>('all');

  if (!resultSet || !pivotConfig) {
    return <p>Loading data...</p>;
  }

  const pivotData = resultSet.chartPivot(pivotConfig);
  const seriesData = resultSet.series(pivotConfig);

  if (pivotData.length === 0 || seriesData.length === 0) {
    return <p>No data available</p>;
  }

  const labels = pivotData.map((row) => row.x);
  const datasets = seriesData.map((item) => ({
    label: item.title,
    data: item.series.map(({ value }) => value),
  }));

  const pieDataset = {
    label: 'Data',
    data: seriesData.flatMap((item) => item.series.map(({ value }) => value)),
  };

  const chartData = { labels, datasets };
  const pieData = { labels, datasets: [pieDataset] };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
     
      <nav style={{ background: '#007bff', padding: '10px', textAlign: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedChart('all')}
          style={{ margin: '5px', padding: '10px 20px', background: '#0056b3', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Show All
        </button>
        <button
          onClick={() => setSelectedChart('line')}
          style={{ margin: '5px', padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          Line Chart
        </button>
        <button
          onClick={() => setSelectedChart('bar')}
          style={{ margin: '5px', padding: '10px 20px', background: '#ffc107', color: '#000', border: 'none', cursor: 'pointer' }}
        >
          Bar Chart
        </button>
        <button
          onClick={() => setSelectedChart('pie')}
          style={{ margin: '5px', padding: '10px 20px', background: '#dc3545', color: '#000', border: 'none', cursor: 'pointer' }}
        >
          Pie Chart
        </button>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {(selectedChart === 'line' || selectedChart === 'all') && (
          <div style={{ width: selectedChart === 'line' ? '100%' : '400px', height: '500px', color:'#28a745' }}>
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Line Chart</h3>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
        {(selectedChart === 'bar' || selectedChart === 'all') && (
          <div style={{ width: selectedChart === 'bar' ? '100%' : '400px', height: '500px' ,color:'#ffc107'}}>
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Bar Chart</h3>
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
        {(selectedChart === 'pie' || selectedChart === 'all') && (
          <div style={{ width: selectedChart === 'pie' ? '100%' : '400px', height: '500px' ,color:'#dc3545' }}>
            <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Pie Chart</h3>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        )}
      </div>
    </div>
  );
}
