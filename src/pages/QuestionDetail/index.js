import { Card, Typography, Button } from "antd";
import "./QuestionDetail.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _saveQuestionAnswer } from "../../data/_DATA";
import { allUser } from "../../app/userSlice";
import { allQuestions } from "../../app/questionSlice";
import { getData } from "../../api/data";
import { login } from "../../app/infoUserSlice";

const { Title } = Typography;

const OptionDetail = () => {
  const { question_id } = useParams();
  const userInfo = useSelector((state) => state.infoUser);
  const users = useSelector((state) => state.users);
  const listQuestion = useSelector((state) => state.question);
  const [detailQuestion, setDetailQuestion] = useState({});
  const [author, setAuthor] = useState({});
  const [totalVotes, setTotalVotes] = useState(null);
  const [isVoted, setIsVoted] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    let data = Object.values(listQuestion).find(
      (question) => question.id === question_id
    );
    let detailAuthor = Object.values(users).find((user) => {
      return user.id === data.author;
    });
    let checkVoted = {
      optionOne: data.optionOne.votes.includes(userInfo.id),
      optionTwo: data.optionTwo.votes.includes(userInfo.id),
    };

    setIsVoted(checkVoted);
    setDetailQuestion(data);
    setAuthor(detailAuthor);
  }, [question_id, listQuestion]);

  const handleVote = async (option) => {
    const params = {
      authedUser: userInfo.id,
      qid: detailQuestion.id,
      answer: option,
    };
    await _saveQuestionAnswer(params);
    const { users, questions } = await getData();
    const newUser = Object.values(users).find(
      (user) => user.id === userInfo.id
    );
    dispatch(login(newUser));
    dispatch(allUser(users));
    dispatch(allQuestions(questions));
  };

  return (
    <div className="detail-page">
      <Card
        style={{
          width: 800,
          margin: "auto",
          marginTop: 50,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
            flexDirection: "column",
          }}
        >
          <img
            src={author?.avatarURL}
            alt="User Avatar"
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              marginRight: 10,
            }}
          />
          <div>
            <div style={{ fontWeight: "bold" }}>{detailQuestion.author}</div>
          </div>
        </div>
        <Title level={3} style={{ marginBottom: 20 }}>
          Would You Rather?
        </Title>
        {detailQuestion.optionOne && detailQuestion.optionTwo && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div className="item-vote">
              <p>{detailQuestion.optionOne.text}</p>
              {!isVoted.optionOne && !isVoted.optionTwo ? (
                <Button
                  style={{ width: "50%" }}
                  onClick={() => handleVote("optionOne")}
                >
                  Vote
                </Button>
              ) : (
                <div>
                  {isVoted.optionOne && "Voted"}
                  <br />
                  Total Votes : {detailQuestion.optionOne.votes.length} - Total
                  percents:{" "}
                  {Math.round(
                    (detailQuestion.optionOne.votes.length /
                      (detailQuestion.optionTwo.votes.length +
                        detailQuestion.optionOne.votes.length)) *
                      100
                  ).toFixed(2) + "%"}
                </div>
              )}
            </div>
            <div className="item-vote">
              <p> {detailQuestion.optionTwo.text}</p>
              {!isVoted.optionOne && !isVoted.optionTwo ? (
                <Button
                  style={{ width: "50%" }}
                  onClick={() => handleVote("optionTwo")}
                >
                  Vote
                </Button>
              ) : (
                <div>
                  {isVoted.optionTwo && "Voted"}
                  <br />
                  Total Votes : {detailQuestion.optionTwo.votes.length} - Total
                  percents:{" "}
                  {Math.round(
                    (detailQuestion.optionTwo.votes.length /
                      (detailQuestion.optionTwo.votes.length +
                        detailQuestion.optionOne.votes.length)) *
                      100
                  ).toFixed(2) + "%"}
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OptionDetail;
