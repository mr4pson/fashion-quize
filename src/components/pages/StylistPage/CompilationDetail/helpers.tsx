import { Button, Form, Select } from "antd";

import { TFormField } from "common/types/types";
import { TCompilation } from "../CompilationsPage/types";
import { TaskStatus } from "../TasksPage/types";
import { layout } from "./consts";

export const handleEditItemParam = (
  e,
  compilation: TCompilation,
  fieldName: string,
  lookIndex?: number,
  lookItemIndex?: number,
  dispatch?: any,
  setCompilation?
) => {
  const updatedCompilation = {
    id: compilation.id,
    task: compilation.task,
    looks: compilation.looks.map((look, lookI) => {
      if (lookIndex === lookI) {
        return {
          id: look.id,
          items: look.items.map((lookItem, lookItemI) => {
            if (lookItemIndex === lookItemI) {
              return {
                id: lookItem.id,
                photo: lookItem.photo,
                price: lookItem.price,
                name: lookItem.name,
                [fieldName]: e.currentTarget.value,
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

export const handleDelItem = (
  compilation: TCompilation,
  lookIndex: number,
  lookItemIndex: number,
  dispatch,
  setCompilation
) => {
  const updatedCompilation = {
    id: compilation.id,
    task: compilation.task,
    looks: compilation.looks.map((look, lookI) => {
      if (lookIndex === lookI) {
        return {
          id: look.id,
          items: look.items.filter(
            (item, lookItemI) => lookItemIndex !== lookItemI
          ),
        };
      }
      return look;
    }),
  };

  dispatch(setCompilation(updatedCompilation));
};

export const handleAddItem = (
  index: number,
  inputFileRef: React.MutableRefObject<any>,
  setCurrentLookIndex: React.Dispatch<React.SetStateAction<number | undefined>>
) => {
  inputFileRef.current.input.click();
  setCurrentLookIndex(index);
};

export const getFormField = (
  type: string,
  field: TFormField,
  statuses: TaskStatus[],
  loading: boolean,
  compilation: TCompilation,
  disabled?: boolean
) =>
  ({
    STATUS: (
      <Form.Item
        name={field.name}
        label={field.label}
        rules={[{ required: true }]}
      >
        <Select open={field.readonly ? false : undefined}>
          {statuses
            .map((type) => ({
              value: type.id,
              title: type.title,
            }))
            .map((option, index) => (
              <Select.Option
                key={`task-${field.name}` + index}
                value={option.value}
              >
                {option.title}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    ),
    BUTTON: compilation.task?.status.title !== "Завершена" && (
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button
          disabled={disabled}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          {field.label}
        </Button>
      </Form.Item>
    ),
  }[type]);
