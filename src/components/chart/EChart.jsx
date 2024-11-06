import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "1500",
      user: "All Users",
    },
    {
      Title: "Employees",
      user: "1200",
    },
    {
      Title: "10",
      user: "aDMINS",
    },
    {
      Title: "1082",
      user: "Assets",
    },
  ];

  return (
    <>
      <div id="chart">
        <Title level={5}>All Assets</Title>
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={360}
        />
      </div>
      {/* <div className="chart-vistior">
        <Title level={5}>All Users</Title>
        <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div> */}
    </>
  );
}

export default EChart;
