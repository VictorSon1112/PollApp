import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/index";
import { getData } from "./api/data";
import { useDispatch } from "react-redux";
import { allUser } from "./app/userSlice";
import { allQuestions } from "./app/questionSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage/index";
import CreatePollPage from "./pages/CreatePollPage/index";
import LeaderBoardPage from "./pages/LeaderBoardPage/index";
import { ProtectedRoute } from "./components/ProtectedRoute";
import OptionDetail from "./pages/QuestionDetail";
import NotFoundPage from "./pages/NotFoundPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/questions/:question_id",
    element: (
      <ProtectedRoute>
        <OptionDetail />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/leaderBoard",
    element: (
      <ProtectedRoute>
        <LeaderBoardPage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/add",
    element: (
      <ProtectedRoute>
        <CreatePollPage />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { users, questions } = await getData();
      dispatch(allUser(users));
      dispatch(allQuestions(questions));
    })();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
