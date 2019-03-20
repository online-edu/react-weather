import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const style = {
  chartContainer: {
    width: '100%',
    height: '100px',
  },
};

export default class Chart extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="mb-3" style={style.chartContainer}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 0, right: 30, left: 30, bottom: 0 }}
          >
            <XAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              dataKey="hours"
            />

            <Tooltip />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#ffcb02"
              fill="#fff6d3"
              dot={true}
              name="Temperature"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
