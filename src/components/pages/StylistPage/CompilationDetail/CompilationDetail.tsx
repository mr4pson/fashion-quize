import { Button, Form, Input } from "antd";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { TypeRootState, useAppDispatch } from "redux/ReduxStore";
import { compilationsThunks } from "redux/slicers/compilationsPageSlice";
import { PageMethods } from "../types";
import styles from "./CompilationDetail.module.scss";
import { BUTTON, formFields, FULL_NAME, LOGIN } from "./consts";
import { TypeEditStylistDto, TypeFormField } from "./types";

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

const CompilationDetail: React.FC<Props> = (props) => {
  const history = useHistory();
  const { id } = useParams() as any;
  console.log(id);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const compilationsState = useSelector((state: TypeRootState) => ({
    compilation: state.compilationsPage.compilation,
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
    if (id) {
      dispatch(compilationsThunks.getCompilation(id));
    }

    return () => {
      dispatch(compilationsThunks.clearCompilation());
    };
  }, [dispatch, id]);

  function getFormField(type: string, field: TypeFormField) {
    switch (type) {
      case FULL_NAME:
      case LOGIN:
        return (
          <Form.Item name={[field.name]} label={field.label} rules={[{ required: true, type: "string", max: 99 }]}>
            <Input />
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

  const formMethod = props.method === PageMethods.CREATE;

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{`Редактирование подборки №${id}`}</h1>
      </div>
      {formMethod && (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={compilationsState.compilation}
        >
          {formFields.map((field) => (
            <div key={field.id} className={styles["detail__field"]}>
              {getFormField(field.type, field)}
            </div>
          ))}
        </Form>
      )}
    </div>
  );
};

export default memo(CompilationDetail);
