import { Button, Table } from "antd";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { memo } from "react";
import { useHistory } from "react-router";
import { AdmPage, paths } from "../routes/constants";
import { CHANGE, DELETE, getColumns } from "./constants";
import styles from "./QuestionsPage.module.scss";

type Props = {
  questions: TypeQuestion[];
  onQuestionRemove: (id: number) => void;
};

const QuestionsPage: React.FC<Props> = (props) => {
  const columns = getColumns(styles, getActionRow);

  function getActionRow(type: string, id: number) {
    switch (type) {
      case CHANGE:
        return () => {
          history.push(paths[AdmPage.QUESTIONS] + "/edit/" + id);
        };
      case DELETE:
        return () => {
          props.onQuestionRemove(id);
        };
      default:
        break;
    }
  }

  const history = useHistory();

  const dataSource = props.questions?.map((question) => ({
    key: question.id,
    ...question,
  }));

  const handleRedirect = () => {
    history.push(paths[AdmPage.QUESTIONS_CREATE]);
  };

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>Список вопросов</h1>
        <Button
          onClick={handleRedirect}
          className={styles["table-top__btn"]}
          type="primary"
        >
          Создать
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default memo(QuestionsPage);
