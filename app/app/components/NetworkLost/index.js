import { images } from '../../config/images';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, Modal } from 'react-native';

const NetworkLost = ({ isVisible }) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <LottieView
            autoSize={true}
            source={images.network}
            autoPlay={true}
            // loop={true}
            style={{
              width: Dimensions.get('screen').width - 100,
              height: Dimensions.get('screen').width - 100,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Define your styles here
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
    padding: 50,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default NetworkLost;
