import { Button, Form, Input, Select } from "antd";
import { FC, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import { TFormField } from "common/types/types";
import Loader from "components/modules/Loader";
import { TRootState, useAppDispatch } from "redux/ReduxStore";
import { stylistsThunks } from "redux/slicers/stylistsPageSlice";
import { AdmPage, paths } from "../routes/constants";
import { PageMethods } from "../types";
import {
  AGE,
  BUTTON,
  CITY,
  formFields,
  FULL_NAME,
  LOGIN,
  SEX,
  sexOptions,
} from "./constants";
import styles from "./StylistDetail.module.scss";
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

type TProps = {
  method: PageMethods;
};

const StylistDetail: FC<TProps> = (props) => {
  const history = useHistory();
  const { id } = useParams() as any;
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { stylist } = useSelector((state: TRootState) => state.stylistsPage);

  const onFinish = async (payload: TypeEditStylistDto) => {
    setLoading(true);
    if (id) {
      await dispatch(stylistsThunks.updateStylist(id, payload));
    } else {
      await dispatch(stylistsThunks.createStylist(payload));
    }
    setLoading(false);
    history.push(paths[AdmPage.STYLISTS]);
  };

  useEffect(() => {
    if (id) {
      dispatch(stylistsThunks.getStylist(id));
    }

    return () => {
      dispatch(stylistsThunks.clearStylist());
    };
  }, [dispatch, id]);

  function getPageTitle() {
    return id ? `Редактирование стилиста №${id}` : "Добавить стилиста";
  }

  function getFormField(type: string, field: TFormField) {
    switch (type) {
      case FULL_NAME:
      case LOGIN:
      case CITY:
        return (
          <Form.Item
            name={[field.name]}
            label={field.label}
            rules={[{ required: true, type: "string", max: 99 }]}
          >
            <Input allowClear />
          </Form.Item>
        );
      case AGE:
        return (
          <Form.Item
            name={[field.name]}
            label={field.label}
            rules={[{ required: true }]}
          >
            <Input
              className={styles["age-input"]}
              type="number"
              max={99}
              min={6}
              allowClear
            />
          </Form.Item>
        );
      case SEX:
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            rules={[{ required: true }]}
          >
            <Select open={field.readonly ? false : undefined}>
              {sexOptions.map((option, index) => (
                <Select.Option
                  key={`sex-${field.name}` + index}
                  value={option.value}
                >
                  {option.title}
                </Select.Option>
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

  const isFormVisible =
    (!!id && !!stylist.name) || props.method === PageMethods.CREATE;

  return (
    <div className={styles["detail"]}>
      <div className={styles["detail__header"]}>
        <h1>{getPageTitle()}</h1>
      </div>
      {isFormVisible && (
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={stylist}
        >
          {formFields.map((field) => (
            <div key={field.id} className={styles["detail__field"]}>
              {getFormField(field.type, field)}
            </div>
          ))}
        </Form>
      )}
      {!isFormVisible && <Loader />}
    </div>
  );
};

export default memo(StylistDetail);
