import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /5;

export default StyleSheet.create({
container: {
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'101%',
    marginTop:50,
},
logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    width: '100%',
    marginTop:-200,
    marginBottom:30,
},
backgroundImage: {
    flex: 1,
    marginTop:-2,
},
label: {
padding: 2,
paddingBottom: 0,
color: '#252D42',
fontSize:17,
fontWeight: '700',
width:'90%',
},
dropdown: {
    width:'80%',
    }
});

