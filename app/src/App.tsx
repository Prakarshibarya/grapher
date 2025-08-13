
import React, { useState } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';

const CsvToGraph: React.FC = () => {
  const [xData, setXData] = useState<number[]>([]);
  const [yData, setYData] = useState<number[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        const parsedX: number[] = [];
        const parsedY: number[] = [];
        results.data.forEach((row: any) => {
          parsedX.push(parseFloat(row.x));
          parsedY.push(parseFloat(row.y));
        });
        setXData(parsedX);
        setYData(parsedY);
      },
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>CSV to Plotly Graph Viewer</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginBottom: '20px' }} />

      {xData.length > 0 && yData.length > 0 && (
        <Plot
          data={[
            {
              x: xData,
              y: yData,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            },
          ]}
          layout={{
            width: 700,
            height: 400,
            title: 'CSV Data Plot',
            xaxis: { title: 'X' },
            yaxis: { title: 'Y' },
          }}
        />
      )}
    </div>
  );
};

export default CsvToGraph;
