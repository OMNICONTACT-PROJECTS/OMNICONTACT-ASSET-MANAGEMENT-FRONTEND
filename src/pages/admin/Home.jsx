import { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Spin } from "antd";
import { DollarSign, User, ShoppingCart, CheckCircle, Clock, User2Icon, User2, GitPullRequestArrow } from "lucide-react";
import employeeService from "../../services/employee.service";
import authService from "../../services/auth.service";
import assetsServices from "../../services/assets.services";
import assetRequestsServices from "../../services/asset-requests.services";
import assetAllocationsServices from "../../services/asset-allocations.services";
import EChart from "../../components/chart/EChart";
import LineChart from "../../components/chart/LineChart";

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
      const organisation_id = authService.getUserOrganisationId()
      try {
        const usersRes = await employeeService.getStatsByOrganisationId(organisation_id)
        const assetsRes = await assetsServices.getAllStatsByOrganisationId(organisation_id)
        const requestsRes = await assetRequestsServices.getAllStatsByOrganisationId(organisation_id)
        const allocationsRes = await assetAllocationsServices.getAllStatsByOrganisationId(organisation_id)

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
      details: stats.allocations?.map(item => ({
        label: `Year ${item.year}`,
        value: item.total_allocations,
        icon: <ShoppingCart size={16} />,
      })),
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
        <>
          <Row className="rowgap-vbox" gutter={[15, 0]}>
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
          <Row gutter={[24, 0]} style={{ marginTop: "-10px" }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-10">
              <Card bordered={false} className="criclebox">
                <EChart />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-10">
              <Card bordered={false} className="criclebox">
                <LineChart />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

console.clear();
export default Home;
