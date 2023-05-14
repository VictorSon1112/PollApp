import { Button } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";

const ItemQuestion = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigateDetail = (id) => {
    navigate(`/questions/${id}`);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="question-author">{data.author}</span>
        <span className="question-timestamp">
          {moment(data.timestamp).format("DD-MMM-YYYY / HH:mm")}
        </span>
      </div>
      <Button
        className="question-detail-btn "
        data-testid="navigate-detail-btn"
        onClick={() => handleNavigateDetail(data.id)}
      >
        Details
      </Button>
    </>
  );
};

export default ItemQuestion;
