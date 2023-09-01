import React, { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import { isEmpty } from 'lodash';
import { Card, ModeButton, ButtonWrapper, Title, TitleWrapper } from './style';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';
import { getAllUsers } from 'api/user';

accessibility(Highcharts);

/**
 * 사용자별 경고 현황 그래프
 */
function WarningGraph() {
  const [userData] = useFetch(getAllUsers, {});
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (isEmpty(userData)) return;
    setSeries([
      {
        name: 'Warning',
        data: userData.map((item) => item.warning || 0),
        color: '#f24343',
      },
      ,
    ]);
  }, [userData]);

  useEffect(() => {
    if (isEmpty(series) || isEmpty(userData)) return;
    // "이름 이모지" 형식으로 카테고리 지정
    const users = userData.map((item) => `${item.notionId} ${item.emoji}`);
    setOptions({
      credits: {
        enabled: false, // 로고 비활성화
      },
      legend: {
        enabled: false,
      },
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'left',
      },
      xAxis: {
        categories: users,
        labels: {
          formatter: function () {
            // 이모지만 라벨로 보여줌. 문자열을 공백 기준으로 스플릿 해서 맨 뒤 원소를 가져온다.
            return this.value.toString().split(' ').slice(-1)[0];
          },
          style: {
            fontSize: '17px', // 폰트 크기 설정
          },
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
        },
        minTickInterval: 1, // 최소 간격
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b> ',
        pointFormat: '<b style="color:{series.color};">{point.y} </b>',
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              enabled: false, // 마우스 오버 시 효과 제거
            },
          },
        },
      },
      series: series,
    });
  }, [series, userData]);

  return (
    <Card>
      <TitleWrapper>
        <Title>경고 현황</Title>
      </TitleWrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}

export default WarningGraph;
