import classNames from "classnames";
import { ReactComponent as LongArrowRight } from "./../../../../assets/icons/long-arrow-right.svg";
import { ReactComponent as ShortArrowRight } from "./../../../../assets/icons/short-arrow-right.svg";

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <>
      <LongArrowRight
        className={classNames(className, "long-arrow-right")}
        style={{ ...style, color: "#fffffff" }}
        onClick={onClick}
      />
      <ShortArrowRight
        className={classNames(className, "short-arrow-right")}
        style={{ ...style, color: "#fffffff" }}
        onClick={onClick}
      />
    </>
  );
};
