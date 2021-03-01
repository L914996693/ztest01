import { Component, OnInit,ElementRef ,NgModule } from '@angular/core';
import * as echarts from "echarts";
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private el: ElementRef
  ) {
    console.log(echarts)
  }
 
  ngOnInit() {
    setTimeout( ()=>{ //延时加载echarts初始化函数
      this.initCharts()
    },100)
    //this.initCharts();
  }
 
  initCharts(){
    const ec = echarts as any;
    let lineChart = echarts.init(document.getElementById("lineChart"));
    let lineChartOption ={
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
          data: ['百度', '谷歌', '必应', '其他']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
        
          {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
              name: '谷歌',
              type: 'bar',
              stack: '搜索引擎',
              data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
              name: '必应',
              type: 'bar',
              stack: '搜索引擎',
              data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
              name: '其他',
              type: 'bar',
              stack: '搜索引擎',
              data: [62, 82, 91, 84, 109, 110, 120]
          }
      ]
    }
    lineChart.setOption(lineChartOption);
  }

}
