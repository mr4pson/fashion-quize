import { Button, Table } from "antd";
import { FC, memo } from "react";
import { useHistory } from "react-router";

import { EQuize } from "common/types/types";
import { TypeQuestion } from "components/pages/QuizePage/types";
import { AdmPage, ID, paths, QUIZE_TYPE } from "../routes/constants";
import { getColumns } from "./consts";
import styles from "./QuestionsPage.module.scss";

type TProps = {
  questions: TypeQuestion[];
  quizeType: EQuize;
  loading: boolean;
  onQuestionRemove: (id: number) => void;
};

const QuestionsPage: FC<TProps> = (props) => {
  const getActionRow = (type: string, id: number) =>
    ({
      EDIT: () =>
        history.push(paths[AdmPage.QUESTIONS_ROUTE].replace(QUIZE_TYPE, props.quizeType).replace(ID, id.toString())),
      DELETE: () => props.onQuestionRemove(id),
    }[type]);

  const columns = getColumns(styles, getActionRow);

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
          {props.quizeType === EQuize.FOR_MEN ? "Опрос для мужчин" : "Опрос для женщин"}
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
