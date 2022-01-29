import classNames from "classnames";
import { FC, memo } from "react";
import Slider from "react-slick";
import { ImageSliderThemes } from ".";
import { NextArrow } from "./NextArrow";

type TProps = {
  theme: ImageSliderThemes;
  slidesToShow: number;
  children: React.ReactNode;
};

const ImageSlider: FC<TProps> = ({ theme, slidesToShow, children }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <></>,
  };

  const getClassNames = (theme: ImageSliderThemes) => {
    return classNames({
      "image-slider": true,
      "image-slider--light": theme === ImageSliderThemes.LIGHT,
      "image-slider--dark": theme === ImageSliderThemes.DARK,
    });
  };

  return (
    <div className={getClassNames(theme)}>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
};

export default memo(ImageSlider);
