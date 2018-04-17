import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
container: {
    justifyContent: 'center',
    margin:10,
},
titre: {
    marginTop:10,
    padding: 2,
    paddingBottom: 0,
    color: '#D33C5B',
    fontSize:20,
    fontWeight: '700',
    width:'90%',
},
button: {
    marginTop:30,
    alignItems: 'center',
},
label: {
    marginTop:6,
    color: '#252D42',
    fontSize:17,
    fontWeight: '700',
    width:'100%',
    marginBottom:4,
},
dropdown: {
    width:'100%',
},
input: {
    backgroundColor:'#eee',
    paddingLeft:10,
    borderWidth:1,
    borderColor:'rgba(37, 45, 66, 0.4)',
},
buttonAdd: {
    backgroundColor:'#D33C5B',
    height:50,
    width:50,
    marginLeft:-2,
    marginTop:2,
},
buttonSearch: {
    backgroundColor:'rgba(37, 45, 66, 0.8)',
    height:50,
    width:50,
    marginLeft:-2,
    marginTop:2,
},
content: {
    width:'100%',
    borderWidth:0,
    marginTop:10,
},
header: {
    borderWidth:0,
    height:70,
    width:'100%',
    marginTop:-15,
},
listItem: {
    borderWidth:1,
    borderColor:'rgba(37, 45, 66, 0.1)',
    marginTop:1,
    marginBottom:1,
},
item: {
    fontSize:18,
    fontWeight:'bold',
    color: '#252D42',
    marginLeft:10,
    marginRight:50,
    //marginTop:20,
},
listItemRecipe: {
    borderWidth:1,
    borderColor:'rgba(37, 45, 66, 0.1)',
    padding:10,
},
contentRecipe: {
    width:'105%',
    borderWidth:0,
    marginLeft:-8,
},
image:{
    width: 120, 
    height: 80,
    margin:-10,

}
});

