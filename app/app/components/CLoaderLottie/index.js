// Import React and Component
import React from 'react';
import LottieView from 'lottie-react-native';
import { images } from '../../config/images';
import { StyleSheet } from 'react-native';

const Loader = () => {
  return (
    <LottieView
      autoSize={true}
      source={images.loading}
      autoPlay={true}
      style={styles.loader}
    />
  );
};

export default React.memo(Loader);

const styles = StyleSheet.create({
  loader: {
    height: 100,
    width: '100%',
    borderRadius: 200,
  },
});
