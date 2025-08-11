'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ records }) => {
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  // Aggregate expenses by date
  const aggregateByDate = (records) => {
    const dateMap = new Map();

    records.forEach((record) => {
      const dateObj = new Date(record.date);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getUTCDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;
      const existing = dateMap.get(dateKey);

      if (existing) {
        existing.total += record.amount;
        if (!existing.categories.includes(record.category)) {
          existing.categories.push(record.category);
        }
      } else {
        dateMap.set(dateKey, {
          total: record.amount,
          categories: [record.category],
          originalDate: record.date,
        });
      }
    });

    return Array.from(dateMap.entries())
      .map(([date, data]) => ({
        date,
        amount: data.total,
        categories: data.categories,
        originalDate: data.originalDate,
      }))
      .sort(
        (a, b) =>
          new Date(a.originalDate).getTime() -
          new Date(b.originalDate).getTime()
      );
  };

  const aggregatedData = aggregateByDate(records);

  const getAmountColor = (amount) => {
    if (amount > 200)
      return { bg: 'rgba(255, 99, 132, 0.2)', border: 'rgba(255, 99, 132, 1)' };
    if (amount > 100)
      return { bg: 'rgba(255, 206, 86, 0.2)', border: 'rgba(255, 206, 86, 1)' };
    if (amount > 50)
      return { bg: 'rgba(54, 162, 235, 0.2)', border: 'rgba(54, 162, 235, 1)' };
    return { bg: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' };
  };

  const data = {
    labels: aggregatedData.map((item) => {
      const [, month, day] = item.date.split('-');
      return `${month}/${day}`;
    }),
    datasets: [
      {
        data: aggregatedData.map((item) => item.amount),
        backgroundColor: aggregatedData.map(
          (item) => getAmountColor(item.amount).bg
        ),
        borderColor: aggregatedData.map(
          (item) => getAmountColor(item.amount).border
        ),
        borderWidth: 1,
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            const dataIndex = context.dataIndex;
            const item = aggregatedData[dataIndex];
            const categoriesText =
              item.categories.length > 1
                ? `Categories: ${item.categories.join(', ')}`
                : `Category: ${item.categories[0]}`;
            return [`Total: $${item.amount.toFixed(2)}`, categoriesText];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: isMobile ? 12 : 14, weight: 'bold' },
          color: '#2c3e50',
        },
        ticks: {
          font: { size: isMobile ? 10 : 12 },
          color: '#7f8c8d',
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0,
        },
        grid: { display: false },
      },
      y: {
        title: {
          display: true,
          text: 'Amount ($)',
          font: { size: isMobile ? 12 : 16, weight: 'bold' },
          color: '#2c3e50',
        },
        ticks: {
          font: { size: isMobile ? 10 : 12 },
          color: '#7f8c8d',
          callback: (value) => '$' + value,
        },
        grid: { color: '#e0e0e0' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
