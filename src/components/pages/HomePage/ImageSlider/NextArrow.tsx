import { ReactComponent as LongArrowRight } from "./../../../../assets/icons/long-arrow-right.svg";

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <LongArrowRight
      className={className}
      style={{ ...style, color: "#fffffff" }}
      onClick={onClick}
    />
  );
};
