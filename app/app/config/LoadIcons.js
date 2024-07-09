import { PixelRatio, Platform } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import FORTAB from '../components/MQ';
import icoMoonConfig from './selection.json';

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

const iconSize = FORTAB ? 30 : 22;
const navIconSize =
  __DEV__ === false && Platform.OS === 'android'
    ? PixelRatio.getPixelSizeForLayoutSize(8)
    : iconSize;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;

// const icons = {
//   'add-circle': [30, '#000000'],
//   'keyboard-arrow-left': [navIconSize, '#FFF'],
// };
// const oicons = {
//   home: [navIconSize, '#000'],
// };
// const ficons = {
//   bars: [navIconSize, '#000'],
//   search: [navIconSize, '#FFFFFF'],
//   newspaper: [navIconSize, '#FFFFFF'],
//   comments: [navIconSize, '#FFFFFF'],
//   gem: [navIconSize, '#FFFFFF'],
//   'user-circle': [navIconSize, '#FFFFFF'],
//   'chevron-left': [navIconSize, '#FFFFFF'],
//   'arrow-left': [navIconSize, '#FFFFFF'],
//   'less-than': [navIconSize, '#FFF'],
//   'map-marked-alt': [navIconSize, '#FFF'],
//   'sliders-h': [navIconSize, '#FFFFFF'],
//   'pencil-alt': [navIconSize, '#FFFFFF'],
// };

// const eIcon = {
//   'dots-three-horizontal': [navIconSize, '#FFFFFF'],
//   message: [navIconSize, '#000'],
// };
// const anticons = {
//   profile: [navIconSize, '#000'],
// };

const CustIcon = {
  Home: [30, '#7E87AE'],
  category: [30, '#7E87AE'],
  MyActivities: [30, '#7E87AE'],
  inbox: [30, '#7E87AE'],
  profile: [30, '#7E87AE'],
};
const iconsArray = [[CustIcon, CustomIcon]];

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  const allFonts = [iconsArray].map((iconArrayMain) =>
    Promise.all(
      iconArrayMain.map((iconArray) =>
        Promise.all(
          Object.keys(iconArray[0]).map((iconName) =>
            // IconName--suffix--other-suffix is just the mapping name in iconsMap
            iconArray[1].getImageSource(
              iconName.replace(replaceSuffixPattern, ''),
              iconArray[0][iconName][0],
              iconArray[0][iconName][1],
            ),
          ),
        ).then(
          (sources) =>
            Object.keys(iconArray[0]).forEach(
              (iconName, idx) => (iconsMap[iconName] = sources[idx]),
            ),
          // resolve(true);
        ),
      ),
    ).then(() => {
      resolve(true);
    }),
  );

  return Promise.all(allFonts);
});

export { iconsMap, iconsLoaded, CustomIcon };
