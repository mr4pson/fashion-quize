import { Button, Form, Select } from "antd";
import { TypeFormField } from "common/types/type";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { ILook, ILookItem } from "../CompilationsPage/types";
import { paths, StlPage } from "../routes/consts";
import { PageMethods } from "../types";
import styles from "./CompilationDetail.module.scss";
import { BUTTON, formFields, STATUS } from "./consts";
import { TypeEditStylistDto } from "./types";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} не может быть пустым!",
  string: {
    max: "${label} не может быть длиннее ${max} символов!",
  },
};
/* eslint-enable no-template-curly-in-string */

type Props = {
  method: PageMethods;
};

const { Option } = Select;

const CompilationDetail: React.FC<Props> = (props) => {
  const history = useHistory();
  const { id } = useParams() as any;

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const compilationsState = useSelector((state: TypeRootState) => ({
    compilation: state.compilationsPage.compilation,
    statuses: state.tasksPage.statuses,
  }));

  console.log(compilationsState.compilation);

  const onFinish = async (payload: TypeEditStylistDto) => {
    console.log(payload);
    // setLoading(true);
    // if (id) {
    //   await dispatch(stylistsThunks.updateStylist(id, payload));
    // }
    // setLoading(false);
    // history.push(paths[AdmPage.STYLISTS]);
  };

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      if (id) {
        dispatch(compilationsThunks.getCompilation(id));
      }
    })()
    return () => {
      dispatch(compilationsThunks.clearCompilation());
    };
  }, [dispatch, id]);

  function getFormField(type: string, field: TypeFormField) {
    switch (type) {
      case STATUS:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true }]}
          >
            <Select open={field.readonly ? false : undefined}>
              {compilationsState.statuses
                .map((type) => ({
                  value: type.id,
                  title: type.title,
                }))
                .map((option, index) => (
                  <Option
                    key={`task-${field.name}` + index}
                    value={option.value}
                  >
                    {option.title}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        );
      case BUTTON:
        return (
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button loading={loading} type="primary" htmlType="submit">
              {field.label}
            </Button>
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  const handleAddPhoto = (look: ILook) => {
    console.log(look);
    // look.items.push({
    //   name: 'Test',
    //   photo: 'Test photo'
    // });
  }

  // const looks = [
  //   {
  //     items: []
  //   },
  //   {
  //     items: []
  //   }
  // ];
  const looks = compilationsState.compilation.looks;

  const compilationIsNotEmpty = !!Object.keys(compilationsState.compilation).length;
  // const formMethod = props.method === PageMethods.CREATE;
  let initialValues;
  if (id && compilationIsNotEmpty) {
    initialValues = {
      status: compilationsState.compilation.task.status.id,
    }
  }

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{id ? `Редактирование подборки №${id}` : "Создание подборки"}</h1>
      </div>
      {compilationIsNotEmpty && (
        <div>
          <div className={styles['link-rows']}>
            <div className={styles["link-row"]}>
              <span>Задача:</span>
              <Link
                to={`${paths[StlPage.TASKS]}/${
                  compilationsState.compilation.task.id
                }`}
              >
                Задача №{compilationsState.compilation.task.id}
              </Link>
            </div>
            <div className={styles["link-row"]}>
              <span>Пользователь:</span>
              <Link to={"#"}>
                {compilationsState.compilation.task.user.name}
              </Link>
            </div>
          </div>
          <div className={styles['looks']}>
            <h1 className={styles['looks__header']}>Луки</h1>
            <div className={styles['looks__body']}>
              {
                looks.map(look => (
                  <div className={styles['look']}>
                    {look.items.map((lookItem: ILookItem) => (
                      <div className={styles['look-item']}>
                        <div className={styles['look-item__photo']}></div>
                        <div className={styles['look-item__name']}>{lookItem.name}</div>
                      </div>
                    ))}
                    <Button onClick={() => {handleAddPhoto(look)}} className={styles['look-add-btn']}>+</Button>
                  </div>
                ))
              }
            </div>
          </div>
          {
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
              initialValues={initialValues}
            >
              {formFields.map((field) => (
                <div key={field.id} className={styles["detail__field"]}>
                  {getFormField(field.type, field)}
                </div>
              ))}
            </Form>
          }
        </div>
      )}
    </div>
  );
};

export default memo(CompilationDetail);
