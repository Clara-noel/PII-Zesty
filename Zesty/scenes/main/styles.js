import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /5;

export default StyleSheet.create({
container: {
    justifyContent: 'center',
    margin:10,
},
label: {
    marginTop:10,
    padding: 2,
    paddingBottom: 0,
    color: '#D33C5B',
    fontSize:20,
    fontWeight: '700',
    width:'90%',
},

});

