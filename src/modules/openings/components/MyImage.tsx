import FastImage from 'react-native-fast-image'

interface MyImageProps {    
    uri: string;
}

export const MyImage = (props: MyImageProps) => (
  <FastImage
      style={{ width: 80, height: 80, borderRadius: 5, marginRight: 10  }}
      source={{
          uri: props.uri,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
  />
)
