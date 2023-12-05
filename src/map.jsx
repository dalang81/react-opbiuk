import React, { useEffect, useState } from 'react';
// import { render } from "react-dom"
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
// import china from 'echarts/map/json/china.json';
import { mapData } from "./data";

const App = ({ mapData }) => {
  // const [provincialData, setProvincialData] = useState([]);

  // useEffect(() => {
  //   //getData()
  // }, []);

  // const getData = () => {
  //   NewAPI.getMapData().then(
  //     (result) => {
  //       setProvincialData(result);
  //     },
  //     (error) => console.log("error")
  //   );
  // };

  const option = {
    geo: {
      map: 'china',
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#feffff',
            fontSize: 10,
          },
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#feffff',
            fontSize: 10,
          },
        },
      },
      roam: false,
      zoom: 1.2,
      itemStyle: {
        normal: {
          areaColor: '#eee',
          borderColor: '#7EB4FF',
          borderWidth: 0.5,
        },
        emphasis: {
          areaColor: '#42CEEA',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      zlevel: 1,
    },
    visualMap: {
      show: true,
      type: 'continuous',
      min: 0,
      max: 500,
      right: 8,
      bottom: 10,
      seriesIndex: [0],
      color: ['#5393FF', '#2E85E8', '#1F54C6', '#0E3794', '#082371'],
      textStyle: {
        color: '#feffff',
      },
      calculable: true,
      zlevel: 2,
    },
    series: [
      {
        name: '即时疫情数据',
        type: 'map',
        geoIndex: 0,
        data: mapData,
        zlevel: 3,
      },
    ],
    tooltip: {
      show: true,
      // backgroundColor:'white',
      // textStyle:{
      //   color:'black',
      //   lineHeight: 56,
      // },
      // formatter: "{a} <br/>{b} : {c}"
      // formatter: "{a}<br/>{b}<br/>现在风险等级： {c}<br/>含有中高风险区： {d}个<br/>现追踪有： {c}集团成员",
      formatter: function (params) {
        // return '<p>'+params.value+'层</p><p>温度：'+params.value[0]+'℃</p><p>日期：'+params.value[0]+'</p>';
        return (
          '<p>' +
          params.data?.name +
          ':' +
          params.data?.employee +
          '名' +
          '集团成员</p>' +
          '</p>' +
          '</p><p>含有中高风险区：' +
          params.data?.dangerZone +
          '个' +
          '</p><p>全省现有确诊人数：' +
          params.data?.value +
          '个' +
          '</p> '
        );
      },
      textStyle: {
        // color:'black',
      },
    },
  };

  echarts.registerMap('china', china);

  const onEvents = {
    click: (params) => {
      const { seriesIndex, data } = params;
      if (seriesIndex === 0) return;

      console.log(`点击了${data.name}, 值为${data.value[2]}`);
    },
  };

  return (
    <ReactEcharts
      option={option}
      onEvents={onEvents}
      style={{ height: '50vh', width: '37vw' }}
    />
  );
};

export default App;
