import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Spin } from "antd";
import { DollarSign, User, ShoppingCart, CheckCircle, Clock, User2Icon, User2, GitPullRequestArrow } from "lucide-react";
import axios from "axios";  // Import axios

const { Title } = Typography;

const Home = () => {
  const [stats, setStats] = useState({
    users: null,
    assets: null,
    requests: null,
    allocations: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersRes = await axios.get("https://omni-asset-management-backend.onrender.com/api/v1/users/stats/users/");
        const assetsRes = await axios.get("https://omni-asset-management-backend.onrender.com/api/v1/assets/stats/assets/");
        const requestsRes = await axios.get("https://omni-asset-management-backend.onrender.com/api/v1/asset-requests/stats/requests/");
        const allocationsRes = await axios.get("https://omni-asset-management-backend.onrender.com/api/v1/asset-allocations/stats/allocations/monthly/2025/");

        setStats({
          users: usersRes.data,
          assets: assetsRes.data,
          requests: requestsRes.data,
          allocations: allocationsRes.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const counts = [
    {
      label: "EMPLOYEES",
      value: stats.users?.total_users,
      details: [
        { label: "Male", value: stats.users?.total_male_users, icon: <User2 size={16} /> },
        { label: "Female", value: stats.users?.total_female_users, icon: <User2Icon size={16} /> },
      ],
      icon: <User size={40} />,
      className: "bnb2",
    },
    {
      label: "ASSETS",
      value: stats.assets?.total_assets,
      details: [
        { label: "Available", value: stats.assets?.total_available_assets, icon: <CheckCircle size={16} /> },
        { label: "Allocated", value: stats.assets?.total_allocated_assets, icon: <Clock size={16} /> },
      ],
      icon: <DollarSign size={40} />,
      className: "bnb2",
    },
    {
      label: "REQUESTS",
      value: stats.requests?.total_requests,
      details: [
        { label: "Approved", value: stats.requests?.total_approved_requests, icon: <CheckCircle size={16} /> },
        { label: "Pending", value: stats.requests?.total_pending_requests, icon: <Clock size={16} /> },
      ],
      icon: <GitPullRequestArrow size={40} />,
      className: "redtext",
    },
    {
      label: "ALLOCATIONS",
      value: stats.allocations?.reduce((sum, item) => sum + item.total_allocations, 0),
      details: stats.allocations?.map(item => ({ label: item.month, value: item.total_allocations, icon: <ShoppingCart size={16} /> })) || [],
      icon: <ShoppingCart size={40} />,
      className: "bnb2",
    }
  ];

  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {counts.map((count, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24">
              <Card style={{ backgroundColor: "#002147", color: "red", height: "120px" }} bordered={false} className="criclebox">
                <div className="number" style={{ marginTop: "-18px" }}>
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={16} style={{ display: "block" }}>
                      <span style={{ color: "#cfcbcb" }}>{count.label}</span>
                      <Title style={{ color: "white", fontWeight: "900" }} level={3}>{count.value}</Title>
                    </Col>
                    <Col xs={8}>
                      <div className="icon-box">{count.icon}</div>
                    </Col>
                  </Row>
                </div>
                <div style={{ marginTop: "3px", color: "#cfcbcb", display: "flex", justifyContent: "space-between" }}>
                  {count.details.map((detail, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {detail.icon}
                      <span>{detail.label}:</span><Title style={{ color: "white", fontSize: "20px", fontWeight: "400", marginTop: "8px" }}> {detail.value}</Title>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;




{/* <Row gutter={[24, 0]}>
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
</Row> */}

