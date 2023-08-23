import React, { useState, useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import { isEmpty } from 'lodash';
import { getUserSolvedStat } from 'api/statistics';
import { Card, ModeButton, ButtonWrapper, Title, TitleWrapper } from './style';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import accessibility from 'highcharts/modules/accessibility';

accessibility(Highcharts);

/**
 * 사용자별 해결한 문제 현황 그래프
 */
function SolvedGraph() {
  const modeList = [
    { key: 'daily', name: '일간' },
    { key: 'weekly', name: '주간' },
    { key: 'total', name: '전체' },
  ];
  const [statData] = useFetch(getUserSolvedStat, null, {});
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [mode, setMode] = useState(modeList[0].key);

  useEffect(() => {
    if (isEmpty(statData)) return;
    const { userBars } = statData;
    setSeries([
      {
        name: 'Ruby',
        data: userBars.map(
          (item) => item.userProblemStatistics[`${mode}SolvedCountRuby`] || 0,
        ),
        color: '#ea3364',
      },
      {
        name: 'Diamond',
        data: userBars.map(
          (item) =>
            item.userProblemStatistics[`${mode}SolvedCountDiamond`] || 0,
        ),
        color: '#50b1f6',
      },
      {
        name: 'Platinum',
        data: userBars.map(
          (item) =>
            item.userProblemStatistics[`${mode}SolvedCountPlatinum`] || 0,
        ),
        color: '#6ddfa8',
      },
      {
        name: 'Gold',
        data: userBars.map(
          (item) => item.userProblemStatistics[`${mode}SolvedCountGold`] || 0,
        ),
        color: '#e09e37',
      },
      {
        name: 'Sliver',
        data: userBars.map(
          (item) => item.userProblemStatistics[`${mode}SolvedCountSilver`] || 0,
        ),
        color: '#495e78',
      },
      {
        name: 'Bronze',
        data: userBars.map(
          (item) => item.userProblemStatistics[`${mode}SolvedCountBronze`] || 0,
        ),
        color: '#a25a1f',
      },
    ]);
  }, [statData, mode]);

  useEffect(() => {
    if (isEmpty(series) || isEmpty(statData)) return;
    const { userBars } = statData;
    // "이름 이모지" 형식으로 카테고리 지정
    const users = userBars.map(
      (item) => `${item.user.notionId} ${item.user.emoji}`,
    );
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
        tickInterval: 1, // y축 간격
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat:
          '<b>total {point.stackTotal}</b><br/>' +
          '<b style="color: {series.color};">{series.name}</b> {point.y}',
      },
      plotOptions: {
        series: {
          stacking: 'normal',
        },
      },
      series: series,
    });
  }, [series, statData]);

  return (
    <Card>
      <TitleWrapper>
        <Title>해결한 문제 현황</Title>
        <ButtonWrapper>
          {modeList.map((m) => (
            <ModeButton
              key={m.key}
              onClick={() => {
                setMode(m.key);
              }}
              selected={m.key === mode}
            >
              {m.name}
            </ModeButton>
          ))}
        </ButtonWrapper>
      </TitleWrapper>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}

export default SolvedGraph;
