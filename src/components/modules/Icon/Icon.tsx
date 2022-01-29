import { FC, memo, SVGProps } from "react";

type TIcon = {
  html: string;
  viewBox: string;
};

interface IProps extends SVGProps<SVGSVGElement> {
  icon: TIcon;
}

const Icon: FC<IProps> = ({ icon, className, fill, height = 24, width = 24, ...props }) => (
  <svg
    viewBox={icon.viewBox}
    dangerouslySetInnerHTML={{ __html: icon.html }}
    {...(className ? { className } : { fill, height, width })}
    {...props}
  />
);

export default memo(Icon);
