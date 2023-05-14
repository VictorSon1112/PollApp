import { _getQuestions, _getUsers } from '../data/_DATA';

export async function getData() {
    const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
    return {
        users,
        questions,
    };
  }
  