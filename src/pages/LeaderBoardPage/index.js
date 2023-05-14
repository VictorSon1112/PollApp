import { Avatar, Table } from "antd";
import { useEffect, useState } from "react";

import "./LeaderBoardPage.scss";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "USER",
    dataIndex: "user",
    render: (user) => (
      <>
        <Avatar src={user.avatar} alt={`Avatar of ${user.name}`} />
        <span className="user-name">{user.name}</span>
      </>
    ),
  },
  {
    title: "ANSWERED",
    dataIndex: "answered",
    sorter: (a, b) => a.answered - b.answered,
    defaultSortOrder: "descend",
    className: "answered-column",
  },
  {
    title: "CREATED",
    dataIndex: "created",
    sorter: (a, b) => a.created - b.created,
    className: "created-column",
  },
];

const LeaderBoardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const users = useSelector((state) => state.users);

  useEffect(() => {
    let userList = Object.values(users).map((user) => {
      return {
        key: user.id,
        user: { name: user.name, avatar: user.avatarURL },
        answered: Object.values(user.answers).length,
        created: user.questions.length,
      };
    });
    setLeaderboard(userList);
  }, [users]);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leader Board</h1>
      <Table columns={columns} dataSource={leaderboard} pagination={false} />
    </div>
  );
};

export default LeaderBoardPage;
