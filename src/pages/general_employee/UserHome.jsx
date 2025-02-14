import {
  Card,
  Col,
  Row,
  Typography,
} from "antd";
import {
  DollarSign,
  User,
  Heart,
  ShoppingCart,
} from "lucide-react";
import Echart from "../../components/chart/EChart";
import LineChart from "../../components/chart/LineChart";

const { Title } = Typography;

const UserHome = () => {
  const counts = [
    {
      label: "Today’s Tickets",
      value: "25",
      change: "+30%",
      icon: <DollarSign />,
      className: "bnb2",
    },
    {
      label: "Employees",
      value: "1200",
      change: "+20%",
      icon: <User />,
      className: "bnb2",
    },
    {
      label: "New Assets",
      value: "+1,200",
      change: "-20%",
      icon: <Heart />,
      className: "redtext",
    },
    {
      label: "Approvals",
      value: "20",
      change: "10%",
      icon: <ShoppingCart />,
      className: "bnb2",
    },
  ];

  return (
    <div>
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {counts.map((count, index) => (
          <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
            <Card style={{ backgroundColor: "#002147", color: "red" }} bordered={false} className="criclebox">
              <div className="number">
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span style={{ color: "#cfcbcb" }}>{count.label}</span>
                    <Title style={{ color: "white", fontWeight: "900" }} level={3}>
                      {count.value}
                    </Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">{count.icon}</div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
          <Card bordered={false} className="h-full criclebox">
            <Echart />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
          <Card bordered={false} className="h-full criclebox">
            <LineChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserHome;
