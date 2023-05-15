import FastImage from 'react-native-fast-image';

interface MyImageProps {
  uri: string;
}

export const MyDetailedImage = (props: MyImageProps) => (
  <FastImage
    style={{flex: 1, opacity: 0.9, height: '100%'}}
    source={{
      uri: props.uri,
      headers: {Authorization: 'someAuthToken'},
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);
