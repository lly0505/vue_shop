<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="16">
          <!-- 2.为ECharts准备一个具备大小（宽高）的Dom -->
          <div id="main" style="height:400px;"></div>
          <el-calendar id="main4" v-model="value"> </el-calendar>
        </el-col>
        <el-col :span="8">
          <div id="main2" style="height:400px;"></div>
          <div id="main3" style="height:400px;"></div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 1.导入文件
import echarts from 'echarts'
import _ from 'lodash'

export default {
  data() {
    return {
      value: new Date(),
      // 需要合并的图表配置项
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {},
  // 此时页面上的元素，已经初始化完毕了
  async mounted() {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    var myChart2 = echarts.init(document.getElementById('main2'))
    var myChart3 = echarts.init(document.getElementById('main3'))
    // 获取图表数据
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) return this.$message.error('获取图表数据失败!')

    // 4.指定图表的配置项和数据
    const result = _.merge(res.data, this.options)
    const option2 = {
      angleAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      radiusAxis: {},
      polar: {},
      series: [
        {
          type: 'bar',
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a'
        },
        {
          type: 'bar',
          data: [2, 4, 6, 1, 3, 2, 1],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a'
        },
        {
          type: 'bar',
          data: [1, 2, 3, 4, 1, 2, 5],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a'
        }
      ],
      legend: {
        show: true,
        data: ['A', 'B', 'C']
      }
    }
    const option3 = {
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: [
          { name: '销售（sales）', max: 6500 },
          { name: '管理（Administration）', max: 16000 },
          { name: '信息技术（Information Techology）', max: 30000 },
          { name: '客服（Customer Support）', max: 38000 },
          { name: '研发（Development）', max: 52000 },
          { name: '市场（Marketing）', max: 25000 }
        ]
      },
      series: [
        {
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（Allocated Budget）'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（Actual Spending）'
            }
          ]
        }
      ]
    }
    // 5.使用刚指定的配置项和数据显示图表。
    myChart.setOption(result)
    myChart2.setOption(option2)
    myChart3.setOption(option3)
    window.addEventListener('resize', () => {
      myChart.resize()
      myChart2.resize()
      myChart3.resize()
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
#main
,#main2
,#main3
,#main4 {
  padding: 20px;
}
</style>
