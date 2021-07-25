import { MinusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { TypeFormField } from "common/types/type";
import { FC, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks, setCompilation } from "redux/slicers/compilationsPageSlice";
import { tasksThunks } from "redux/slicers/tasksPageSlice";
import { TLookItem } from "../CompilationsPage/types";
import { paths, StlPage } from "../routes/consts";
import { PageMethods } from "../types";
import styles from "./CompilationDetail.module.scss";
import { formFields } from "./consts";
import { TStatus } from "./types";

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

const CompilationDetail: FC<Props> = (props) => {
  const history = useHistory();
  const { id } = useParams() as any;
  const inputFileRef = useRef<any>();

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { task, looks, statuses } = useSelector((state: TypeRootState) => ({
    task: state.compilationsPage.compilation.task,
    looks: state.compilationsPage.compilation.looks,
    statuses: state.tasksPage.statuses,
  }));

  useEffect(() => {
    (async () => {
      await dispatch(tasksThunks.getTaskStatuses());
      if (id) {
        dispatch(compilationsThunks.getCompilation(id));
      }
    })();

    return () => dispatch(compilationsThunks.clearCompilation());
  }, [dispatch, id]);

  const onFinish = async (status: TStatus) => {
    const payloadForUpdate = { status: status.status, looks: looks };

    setLoading(true);
    if (Object.keys(payloadForUpdate).length) await dispatch(compilationsThunks.updateCompilation(payloadForUpdate));
    setLoading(false);
    history.push(paths[StlPage.COMPILATIONS]);
  };

  const handleEditItemName = (e, lookId?: number, lookItemId?: number) => {
    const updatedCompilation = {
      id: id,
      task: task,
      looks: looks.map((look) => {
        if (look.id === lookId) {
          return {
            id: look.id,
            items: look.items.map((lookItem) => {
              if (lookItem.id === lookItemId) {
                return {
                  id: lookItem.id,
                  name: e.currentTarget.value,
                  photo: lookItem.photo,
                };
              }
              return lookItem;
            }),
          };
        }
        return look;
      }),
    };

    dispatch(setCompilation(updatedCompilation));
  };

  const handleDelItem = (lookId: number, lookItemIndex: number) => {
    const updatedCompilation = {
      id: id,
      task: task,
      looks: looks.map((look) => {
        if (look.id === lookId) {
          return { id: look.id, items: look.items.filter((item, index) => index !== lookItemIndex) };
        }
        return look;
      }),
    };

    dispatch(setCompilation(updatedCompilation));
  };

  const handleAddItem = (lookId: number) => {
    inputFileRef.current.input.click();
    console.log(inputFileRef.current);
    console.log(lookId);
    // look.items.push({
    //   name: 'Test',
    //   photo: 'Test photo'
    // });
  };

  const compilationIsNotEmpty = task && looks.length;

  let initialValues;
  if (id && compilationIsNotEmpty) {
    initialValues = {
      status: task.status.id,
    };
  }

  const getFormField = (type: string, field: TypeFormField) =>
    ({
      STATUS: (
        <Form.Item name={field.name} label={field.label} rules={[{ required: true }]}>
          <Select open={field.readonly ? false : undefined}>
            {statuses
              .map((type) => ({
                value: type.id,
                title: type.title,
              }))
              .map((option, index) => (
                <Option key={`task-${field.name}` + index} value={option.value}>
                  {option.title}
                </Option>
              ))}
          </Select>
        </Form.Item>
      ),
      BUTTON: (
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button loading={loading} type="primary" htmlType="submit">
            {field.label}
          </Button>
        </Form.Item>
      ),
    }[type]);

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{`Редактирование подборки №${id}`}</h1>
      </div>
      {compilationIsNotEmpty && (
        <>
          <div className={styles["link-rows"]}>
            <div className={styles["link-row"]}>
              <span>Задача:</span>
              <Link to={`${paths[StlPage.TASKS]}/${task.id}`}>Задача №{task.id}</Link>
            </div>
            <div className={styles["link-row"]}>
              <span>Пользователь:</span>
              <Link to={"#"}>{task.user.name}</Link>
            </div>
          </div>
          <div className={styles["looks"]}>
            <h1 className={styles["looks__header"]}>Луки</h1>
            <div className={styles["looks__body"]}>
              <Input type="file" ref={inputFileRef} style={{ display: "none" }} />

              {looks.map((look) => (
                <div className={styles["look"]} key={look.id}>
                  {look.items.map((lookItem: TLookItem, lookItemIndex: number) => (
                    <div className={styles["look-item"]} key={lookItem.id}>
                      <div
                        className={styles["look-item__photo"]}
                        onClick={() => handleDelItem(look.id!, lookItemIndex)}
                      >
                        <MinusOutlined className={styles["look-item__backdrop"]} />
                      </div>
                      <div className={styles["look-item__name"]}>
                        <Input
                          bordered={false}
                          value={lookItem.name}
                          onChange={(e) => handleEditItemName(e, look.id, lookItem.id)}
                        />
                      </div>
                    </div>
                  ))}
                  {look.items.length < 5 && (
                    <Button className={styles["look-add-btn"]} onClick={() => handleAddItem(look.id!)}>
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            initialValues={initialValues}
          >
            {formFields.map((field) => (
              <div className={styles["detail__field"]} key={field.id}>
                {getFormField(field.type, field)}
              </div>
            ))}
          </Form>
        </>
      )}
    </div>
  );
};

export default memo(CompilationDetail);
