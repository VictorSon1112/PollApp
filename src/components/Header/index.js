import {
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../app/infoUserSlice";

function Header({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeMenu = (item) => {
    navigate(`/${item.key}`);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout.Header className="header-app">
      <div className="wrap-logo" style={{ cursor: "default" }}>
        <div className="logo">Poll App</div>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        className="header-menu"
        onClick={handleChangeMenu}
        items={[
          {
            key: "",
            icon: <HomeOutlined />,
            label: "Home",
          },
          {
            key: "leaderboard",
            icon: <TrophyOutlined />,
            label: "LeaderBoard",
          },
          {
            key: "add",
            icon: <FormOutlined />,
            label: "CreatePoll",
          },
        ]}
      />

      <div className="user-info">
        <div className="user-avatar">
          <img src={user.avatarURL} alt={user.name} />
        </div>
        <div className="user-name">{user.name}</div>
      </div>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Layout.Header>
  );
}

export default Header;
