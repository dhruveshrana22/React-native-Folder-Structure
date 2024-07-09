import { BaseColors } from "@config/theme";
import { Text } from "react-native";
import StarRating from "react-native-star-rating";

export const StarCompo = (props) => {
  const {
    disabled,
    starSize,
    rating,
    maxStars,
    onStarRatingPress = () => null,
    starStyle,
    showError,
    errorText,
    containerStyle,
  } = props;

  return (
    <>
      <StarRating
        disabled={disabled}
        maxStars={maxStars}
        rating={rating}
        starSize={starSize}
        fullStarColor={BaseColors.primary}
        emptyStarColor={BaseColors.primary}
        selectedStar={(rating) => onStarRatingPress(rating)}
        starStyle={{ paddingHorizontal: 1, ...starStyle }}
        containerStyle={{ gap: 10, ...containerStyle }}
      />
      {showError ? <Text style={{ color: "red" }}>{errorText}</Text> : null}
    </>
  );
};
