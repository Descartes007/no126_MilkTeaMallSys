<template>
  <div class="income-chart-container">
    <el-row :gutter="24" class="chart-summary-row">
      <el-col :span="8">
        <div class="summary-card total">
          <div class="summary-label">总收入</div>
          <div class="summary-value">￥{{ totalAll | numFilter }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="summary-card week">
          <div class="summary-label">本周收入</div>
          <div class="summary-value">￥{{ totalWeek | numFilter }}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="summary-card month">
          <div class="summary-label">本月收入</div>
          <div class="summary-value">￥{{ totalMonth | numFilter }}</div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <div class="chart-card-title">收入柱状图</div>
          <div id="bar" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <div class="chart-card-title">收入饼图</div>
          <div id="pie" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <div class="chart-card-title">本周收入折线图</div>
          <div id="weekLine" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card" shadow="hover">
          <div class="chart-card-title">本月收入折线图</div>
          <div id="monthLine" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "IncomeChart",
  data() {
    return {
      sumIncome: 0,
      categoryIncomes: [],
      categoryNames: [],
      incomes: [],
      activeName: "bar",
      totalAll: 0,
      totalWeek: 0,
      totalMonth: 0,
      total: 0,
    };
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "bar":
          this.total = this.totalAll;
          break;
        case "pie":
          this.total = this.totalAll;
          break;
        case "line1":
          this.total = this.totalWeek;
          break;
        case "line2":
          this.total = this.totalMonth;
          break;
      }
    },
  },

  mounted() {
    var barChart = echarts.init(document.getElementById("bar"));
    var pieChart = echarts.init(document.getElementById("pie"));
    var lineChart1 = echarts.init(document.getElementById("weekLine"));
    var lineChart2 = echarts.init(document.getElementById("monthLine"));
    var barOption = {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "收入柱状图",
        x: "center",
      },
      label: {
        show: true, //是否显示
        position: "top",
      },
      xAxis: {
        type: "category",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "bar",
        },
      ],
    };
    var pieOption = {
      tooltip: {
        trigger: "item",
      },
      title: {
        text: "收入饼图",
        x: "center",
      },
      series: [
        {
          type: "pie",
          data: [],
        },
      ],
    };
    var lineOption1 = {
      tooltip: {
        trigger: "item",
      },
      label: {
        show: true, //是否显示
      },
      title: {
        text: "本周收入折线图",
        x: "center",
      },
      xAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "line",
        },
      ],
    };
    var lineOption2 = {
      tooltip: {
        trigger: "item",
      },
      label: {
        show: true, //是否显示
      },
      title: {
        text: "本月收入折线图",
        x: "center",
      },
      xAxis: {
        type: "category",
        data: [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [],
          type: "line",
        },
      ],
    };
    //渲染柱状图和饼图
    this.request.get("/api/income/chart").then((res) => {
      if (res.code === "200") {
        let categoryIncomes = res.data.categoryIncomes;
        let categoryNames = categoryIncomes.map((item) => {
          return item.categoryName;
        });
        let incomes = categoryIncomes.map((item) => {
          return item.categoryIncome;
        });
        barOption.xAxis.data = categoryNames;
        barOption.series[0].data = incomes;
        barChart.setOption(barOption);

        for (let i = 0; i < categoryNames.length; i++) {
          let item = { value: incomes[i], name: categoryNames[i] };
          pieOption.series[0].data.push(item);
        }
        pieChart.setOption(pieOption);
        //计算总和
        let sum = 0;
        incomes.forEach((item) => {
          sum += item;
        });
        this.total = sum;
        this.totalAll = sum;
      }
    });
    //渲染本周折线图
    this.request.get("/api/income/week").then((res) => {
      if (res.code === "200") {
        // lineOption1.xAxis.data = res.data.weekDays;
        let weekIncome = res.data.weekIncome;
        lineOption1.series[0].data = weekIncome;
        lineChart1.setOption(lineOption1);
        //计算本周总营收
        let sum = 0;
        weekIncome.forEach((item) => {
          sum += item;
        });
        this.totalWeek = sum;
      }
    });
    //渲染本月折线图
    this.request.get("/api/income/month").then((res) => {
      if (res.code === "200") {
        lineOption2.xAxis.data = res.data.monthDays;
        let monthIncome = res.data.monthIncome;
        lineOption2.series[0].data = monthIncome;
        lineChart2.setOption(lineOption2);
        //计算本月总营收
        let sum = 0;
        monthIncome.forEach((item) => {
          sum += item;
        });
        this.totalMonth = sum;
      }
    });
    
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位

      let realVal = Number(value).toFixed(2);

      // num.toFixed(2)获取的是字符串

      return Number(realVal);
    },
  },
};
</script>

<style scoped>
.income-chart-container {
  max-width: 1200px;
  margin: 40px auto 0 auto;
  padding: 32px 0 48px 0;
  background: linear-gradient(135deg, #fff0f6 0%, #e0c3fc 100%);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(255, 173, 210, 0.18);
}
.chart-summary-row {
  margin-bottom: 32px;
}
.summary-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(255, 173, 210, 0.10);
  padding: 32px 0 18px 0;
  text-align: center;
  margin-bottom: 12px;
  border: none;
  transition: box-shadow 0.3s, transform 0.3s;
}
.summary-card:hover {
  box-shadow: 0 12px 36px rgba(255, 173, 210, 0.18);
  transform: translateY(-4px) scale(1.04);
}
.summary-card .summary-value {
  font-size: 32px;
  color: #a259e6;
  font-weight: bold;
  text-shadow: 1px 1px 6px rgba(162,89,230,0.08);
}
.chart-row {
  margin-bottom: 32px;
}
.chart-card {
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(255, 173, 210, 0.10);
  padding: 12px 0 0 0;
  min-height: 380px;
  transition: box-shadow 0.3s, transform 0.3s;
  border: none;
}
.chart-card:hover {
  box-shadow: 0 12px 36px rgba(162, 89, 230, 0.18);
  transform: translateY(-6px) scale(1.03);
}
.chart-box {
  width: 100%;
  height: 320px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f3e7fa 0%, #fff0f6 100%);
  box-shadow: 0 2px 8px rgba(162, 89, 230, 0.06);
}
.chart-card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
}
</style>