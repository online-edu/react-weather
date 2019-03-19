import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, Tooltip } from 'recharts';

export default class Chart extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <section className="mb-3">
        <AreaChart
          width={1020}
          height={100}
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
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
          />
        </AreaChart>
      </section>
    );
  }
}
