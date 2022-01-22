import { FC, memo, MouseEventHandler } from "react";

import { TIcon } from ".";

type TProps = {
  icon: TIcon;

  className?: string;
  height?: number;
  width?: number;
  fill?: string;

  onClick?: MouseEventHandler<SVGSVGElement>;
};

const Icon: FC<TProps> = ({ className, icon, fill, height = 16, width = 16, onClick }) => (
  <svg
    viewBox={icon.viewBox}
    dangerouslySetInnerHTML={{ __html: icon.html }}
    {...(className ? { className } : { height, width, fill })}
    {...{ onClick }}
  />
);

export default memo(Icon);
