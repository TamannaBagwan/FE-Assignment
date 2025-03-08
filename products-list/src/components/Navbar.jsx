import { useState } from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const userMenu = (
    <Menu
      items={[
        { key: "profile", label: "Profile" },
        { key: "logout", label: "Logout" },
      ]}
    />
  );

  return (
    <Layout
      style={{
        marginLeft: collapsed ? 80 : 220,
        transition: "margin 0.3s ease",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="md"
        width={220}
        collapsedWidth={80}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1000,
          overflow: "auto",
        }}
      >
        <div
          className="logo"
          style={{ color: "#fff", textAlign: "center", padding: "10px" }}
        >
          <h2 style={{ fontSize: collapsed ? "16px" : "20px" }}>Shop</h2>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["products"]}>
          <Menu.Item
            key="products"
            icon={<AppstoreOutlined />}
            onClick={() => navigate("/")}
          >
            Product Details
          </Menu.Item>
          <Menu.Item
            key="compare"
            icon={<BarChartOutlined />}
            onClick={() => navigate("/compare")}
          >
            Compare Products
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#001529",
            color: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            width: "100%",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "20px" }}>Product Management</span>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ cursor: "pointer", backgroundColor: "#1890ff" }}
            />
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "20px",
            padding: "20px",
            background: "#fff",
            minHeight: "80vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
