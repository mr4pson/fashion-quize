import { Button, Table } from "antd";
import { QuizeTypes } from "common/types/type";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { memo } from "react";
import { useHistory } from "react-router";
import { AdmPage, ID, paths, QUIZE_TYPE } from "../routes/constants";
import { DELETE, EDIT, getColumns } from "./constants";
import styles from "./QuestionsPage.module.scss";

type Props = {
  questions: TypeQuestion[];
  quizeType: QuizeTypes;
  loading: boolean;
  onQuestionRemove: (id: number) => void;
};

const QuestionsPage: React.FC<Props> = (props) => {
  const columns = getColumns(styles, getActionRow);

  function getActionRow(type: string, id: number) {
    switch (type) {
      case EDIT:
        return () => {
          history.push(paths[AdmPage.QUESTIONS_ROUTE].replace(QUIZE_TYPE, props.quizeType).replace(ID, id.toString()));
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
    history.push(paths[AdmPage.QUESTIONS_CREATE].replace(QUIZE_TYPE, props.quizeType));
  };

  return (
    <>
      <div className={styles["table-top"]}>
        <h1 className={styles["table-top__title"]}>
          {props.quizeType === QuizeTypes.FOR_MEN ? "Опрос для мужчин" : "Опрос для женщин"}
        </h1>
        <Button onClick={handleRedirect} className={styles["table-top__btn"]} type="primary">
          Создать
        </Button>
      </div>
      <Table columns={columns} loading={props.loading} dataSource={dataSource} />
    </>
  );
};

export default memo(QuestionsPage);
