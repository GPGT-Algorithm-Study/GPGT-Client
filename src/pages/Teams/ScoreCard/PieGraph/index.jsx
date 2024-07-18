import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';

accessibility(Highcharts);

/**
 * 사용자별 포인트 현황 그래프
 */
function PieGraph({ teamUsers, score }) {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (isEmpty(teamUsers)) return;
    setSeries([
      {
        name: 'Point',
        colorByPoint: true,
        data: teamUsers.map((user) => ({
          name: `${user.notionId} ${user.emoji}`,
          y: Math.round((user.point / score) * 100),
        })),
      },
    ]);
  }, [teamUsers, score]);

  useEffect(() => {
    if (isEmpty(series) || isEmpty(teamUsers)) return;
    setOptions({
      credits: {
        enabled: false, // 로고 비활성화
      },
      legend: {
        enabled: false,
      },
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
        align: 'left',
      },
      tooltip: {
        pointFormat: '<b>{point.y}%</b>',
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            color: 'black',
            softConnector: true,
            connectorWidth: 0,
            verticalAlign: 'top',
            distance: -50,
            formatter: function () {
              if (this.point.y >= 5)
                return `${this.point.name.split(' ').slice(-1)}<br/>${
                  this.point.y
                }%`;
            },
          },
        },
      },
      series: series,
    });
  }, [series, teamUsers, score]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default PieGraph;
