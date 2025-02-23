import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Spin, Alert } from "antd";
import assetsServices from "../../services/assets.services";
import authService from "../../services/auth.service";

const { Title } = Typography;

function EChart() {
  const [chartData, setChartData] = useState({
    series: [{ name: "Assets", data: [] }],
    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%", borderRadius: 5 },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 1, colors: ["transparent"] },
      grid: { show: true, borderColor: "#ccc", strokeDashArray: 2 },
      xaxis: {
        categories: [],
        title: { text: "Months", style: { color: "#fff", fontSize: "14px" } },
        labels: { style: { colors: "#fff" } },
      },
      yaxis: {
        title: { text: "Total Assets", style: { color: "#fff", fontSize: "14px" } },
        labels: { style: { colors: "#fff" } },
      },
      tooltip: {
        y: { formatter: (val) => val },
      },
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const organisation_id = authService.getUserOrganisationId();
      const year = new Date().getFullYear();

      try {
        const response = await assetsServices.getGraphStatsByOrganisationIdAndYear(organisation_id, year);
        const data = response.data;

        const months = data.map((item) => item.month);
        const assetValues = data.map((item) => item.total_assets);

        setChartData({
          series: [{ name: "Assets", data: assetValues }],
          options: {
            ...chartData.options,
            xaxis: { ...chartData.options.xaxis, categories: months },
          },
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setError("Failed to load chart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div id="chart" style={{ marginInline: "-15px", marginTop: "-17px", marginBottom: "0px", height: "425px" }}>
      <Title level={4} style={{ fontWeight: "900" }}><strong>All Assets ({new Date().getFullYear()})</strong></Title>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
          <Spin size="small" />
        </div>
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <ReactApexChart
          className="bar-chart"
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={360}
          style={{ marginInline: "-3px" }}
        />
      )}
    </div>
  );
}

export default EChart;
