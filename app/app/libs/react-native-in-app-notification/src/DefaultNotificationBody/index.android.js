import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View, Text, Image, Vibration } from "react-native";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { BaseColors } from "../../../../config/theme";
import { FontFamily } from "@config/typography";

const styles = {
  container: {
    flex: 1,
    backgroundColor: BaseColors.secondary,
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: BaseColors.primary,
    borderWidth: 2,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItem: "center",
    width: "100%",
    paddingRight: 80,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItem: "center",
    marginHorizontal: 10,
    marginTop: 20,
    backgroundColor: BaseColors.secondary,
    borderRadius: 40,
    borderColor: BaseColors.primary,
  },
  icon: {
    width: "100%",
    height: "100%",
    backgroundColor: BaseColors.primary,
    borderRadius: 10,
  },
  textContainer: {
    alignSelf: "center",
  },
  title: {
    color: BaseColors.text,
    fontFamily: FontFamily.outfitBold,
  },
  message: {
    color: BaseColors.text,
    fontFamily: FontFamily.outfitRegular,
    opacity: 0.9,
    marginTop: 5,
    flexWrap: "wrap",
  },
};

class DefaultNotificationBody extends React.Component {
  constructor() {
    super();

    this.onNotificationPress = this.onNotificationPress.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.vibrate || this.props.vibrate) &&
      this.props.isOpen &&
      !prevProps.isOpen
    ) {
      Vibration.vibrate();
    }
  }

  onNotificationPress() {
    const { onPress, onClose } = this.props;

    onClose();
    onPress();
  }

  onSwipe(direction) {
    const { onClose } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;

    if (direction === SWIPE_RIGHT || direction === SWIPE_LEFT) {
      onClose();
    }
  }

  render() {
    const { title, message, iconApp, icon } = this.props;

    return (
      <GestureRecognizer onSwipe={this.onSwipe} style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.8}
          underlayColor="transparent"
          onPress={this.onNotificationPress}
        >
          <View style={styles.iconContainer}>
            {(icon || iconApp) && (
              <Image source={icon || iconApp} style={styles.icon} />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text numberOfLines={2} style={styles.message}>
              {message}
            </Text>
          </View>
        </TouchableOpacity>
      </GestureRecognizer>
    );
  }
}

DefaultNotificationBody.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  vibrate: PropTypes.bool,
  isOpen: PropTypes.bool,
  onPress: PropTypes.func,
  onClose: PropTypes.func,
  iconApp: Image.propTypes.source,
  icon: Image.propTypes.source,
  additionalProps: PropTypes.object,
};

DefaultNotificationBody.defaultProps = {
  title: "Notification",
  message: "This is a test notification",
  vibrate: true,
  isOpen: false,
  iconApp: null,
  icon: null,
  onPress: () => null,
  onClose: () => null,
  additionalProps: null,
};

export default DefaultNotificationBody;
