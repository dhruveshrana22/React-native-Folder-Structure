import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const FORTAB = width <= 2736 && width >= 600;
export default FORTAB;
