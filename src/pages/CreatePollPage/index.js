import { Button, Form, Input } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuestion } from "../../app/questionSlice";
import { _saveQuestion } from "../../data/_DATA";
import "./CreatePollPage.scss";
import { addQuestionUser } from "../../app/userSlice";

const CreatePollPage = () => {
  const [form] = Form.useForm();
  const infoUser = useSelector((state) => state.infoUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    let questionParams = {
      optionOneText: values.optionOne,
      optionTwoText: values.optionTwo,
      author: infoUser.id,
    };
    let question = await _saveQuestion(questionParams);
    const actionAddQuestionList = addQuestion(question);
    const actionAddQuestIonUser = addQuestionUser(question);
    dispatch(actionAddQuestionList);
    dispatch(actionAddQuestIonUser);
    navigate("/");
  };

  return (
    <div className="create-poll-container">
      <h1>Would You Rather</h1>
      <Form form={form} onFinish={handleSubmit} className="form">
        <Form.Item
          name="optionOne"
          rules={[{ required: true, message: "Please input your option!" }]}
        >
          <Input placeholder="Option One" />
        </Form.Item>
        <Form.Item
          name="optionTwo"
          rules={[{ required: true, message: "Please input your option!" }]}
        >
          <Input placeholder="Option Two" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Poll
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePollPage;
