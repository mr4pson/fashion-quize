import { FC, FormEvent, memo, ReactNode } from "react";

type TProps = {
  className?: string;
  children: ReactNode;
  func?: any;
};

const Form: FC<TProps> = ({ className, children, func }) => {
  const flatten = (list) => {
    const hash = list.reduce((acc, curr) => {
      Array.isArray(curr) ? (acc = acc.concat(flatten(curr))) : acc.push(curr);

      return acc;
    }, []);

    return hash;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const getFormValues = (target: EventTarget) => {
      return Object.values(target).reduce((acc, { name, type, checked, value }) => {
        if (name) {
          if (checked) {
            type === "checkbox" && (acc[name] ? acc[name].push(value) : (acc[name] = [value]));
            type === "radio" && (acc[name] = value);
          } else {
            !["checkbox", "radio"].includes(type) && (acc[name] = value);
          }
        }

        return acc;
      }, {});
    };

    func(getFormValues(e.target));
  };

  //   console.log(Array.isArray(children) && flatten(children));

  return <form {...{ onSubmit, className }}>{children}</form>;
};

export default memo(Form);
