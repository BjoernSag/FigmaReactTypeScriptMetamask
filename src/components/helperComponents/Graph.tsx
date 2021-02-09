
import React from 'react';
import { LineChart, Line, Tooltip, XAxis, CartesianGrid } from 'recharts';

/* This returns a Graph and takes in the data to show in that graph */
function Graph({data}: {data:any}) {
    
    return <LineChart
    width={300}
    height={300}
    data={data}
    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
  >
    <XAxis dataKey="name" />
    <Tooltip />
    <CartesianGrid stroke="#f5f5f5" />
    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
  </LineChart>
  
}

export default Graph;
