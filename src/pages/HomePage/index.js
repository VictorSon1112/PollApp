import { List, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./HomePage.scss";
import ItemQuestion from "./ItemQuestion";
const { TabPane } = Tabs;

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("unanswered");
  const [unansweredQuestion, setUnansweredQuestion] = useState([]);
  const [answeredQuestion, setAnsweredQuestion] = useState([]);

  const questionList = useSelector((state) => state.question);
  const user = useSelector((state) => state.infoUser);

  useEffect(() => {
    let answered = [];
    let unanswered = [];

    Object.values(questionList).forEach((question) => {
      if (user.answers[question.id]) {
        answered = [...answered, question];
      } else {
        unanswered = [...unanswered, question];
      }
    });
    const sortedUnansweredList = unanswered.sort(
      (first, second) => second.timestamp - first.timestamp
    );
    const sortedAnsweredList = answered.sort(
      (first, second) => second.timestamp - first.timestamp
    );
    setAnsweredQuestion(sortedAnsweredList);
    setUnansweredQuestion(sortedUnansweredList);
  }, [questionList]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="home-container">
      <h1 className="leaderboard-title">Home</h1>
      <Tabs defaultActiveKey="unanswered" onChange={handleTabChange}>
        <TabPane tab="Unanswered Questions" key="unanswered">
          <List
            dataSource={unansweredQuestion}
            renderItem={(data) => (
              <List.Item className="item">
                <ItemQuestion data={data} />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Answered Questions" key="answered">
          <List
            dataSource={answeredQuestion}
            renderItem={(data) => (
              <List.Item className="item">
                <ItemQuestion data={data} />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default HomePage;
