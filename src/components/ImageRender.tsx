import React from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface IProps extends FastImageProps {}

const ImageRender = ({...props}: IProps) => {
  return <FastImage {...props} />;
};

export default ImageRender;
