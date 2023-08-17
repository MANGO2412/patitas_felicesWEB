import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Line, Chart} from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import OverallList from '../components/overall-list/OverallList'
import RevenueList from '../components/revenue-list/RevenueList'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
               
                <div className="row">
                    <div className="col-12">
                        <Box>
                            <RevenueByMonthsChart />
                        </Box>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Box>
                            <RevenueByMonthsChart2 />
                        </Box>
                    </div>
                </div>
            </DashboardWrapperMain>
        </DashboardWrapper>
    )
}

export default Dashboard

const RevenueByMonthsChart = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        annotations: {
          // Plotline azul
          blueLine: {
            type: 'line',
            scaleID: 'y',
            value: 22,
            borderColor: 'blue',
            borderWidth: 2,
            label: {
              content: '22',
              enabled: true,
              position: 'end',
            },
          },
          // Plotline verde
          greenLine: {
            type: 'line',
            scaleID: 'y',
            value: 25,
            borderColor: 'green',
            borderWidth: 2,
            label: {
              content: '25',
              enabled: true,
              position: 'end',
            },
          },
          // Plotline rojo
          redLine: {
            type: 'line',
            scaleID: 'y',
            value: 30,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: '30',
              enabled: true,
              position: 'end',
            },
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      line: {
        borderColor: colors.orange, // Color de la línea
        borderWidth: 2, // Ancho de la línea
        fill: false, // Rellenar el área bajo la línea (false para una gráfica de línea)
        tension: 0.1, // Curvatura de la línea (ajustar según preferencia)
      },
    },
  };

  const chartData = {
    labels: data.revenueByMonths.labels,
    datasets: [
      {
        label: 'Temperatura Celcius',
        data: data.revenueByMonths.data,
        fill: true, // Rellenar el área bajo la línea (false para una gráfica de línea)
      },
    ],
  };

  return (
    <>
      <div className="title mb">Temperature, ºC</div>
      <div>
        <Line options={chartOptions} data={chartData} height={300} />
      </div>
    </>
  );
};


const RevenueByMonthsChart2 = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      line: {
        borderColor: colors.orange, // Color de la línea
        borderWidth: 2, // Ancho de la línea
        fill: false, // Rellenar el área bajo la línea (false para una gráfica de línea)
        tension: 0.1, // Curvatura de la línea (ajustar según preferencia)
      },
    },
  };

  const chartData = {
    labels: data.revenueByMonths.labels1,
    datasets: [
      {
        label: 'Temperatura Celcius',
        data: data.revenueByMonths.data1,
        fill: true, // Rellenar el área bajo la línea (false para una gráfica de línea)
      },
    ],
  };

  return (
    <>
      <div className="title mb">%Humity, last 10</div>
      <div>
        <Line options={chartOptions} data={chartData} height={300} />
      </div>
    </>
  );
};
