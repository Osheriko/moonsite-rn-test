import React from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import * as firebase from "firebase";
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default class AddPost extends React.Component{

constructor(){
    super();
    this.state = {title: '', image: '', res: '', counter: ''};
    this._storeData = this._storeData.bind(this);
}    

    render(){

    return(
        <>

    <View style={styles.container}>
    <TextInput
        placeholder="Choose Post Title"
      style={styles.input}
      onChangeText={title => this.setState({title: title})}
      value={this.state.title}
    />
    <TextInput
    placeholder="Choose Image"
      style={styles.input}
      onChangeText={image => this.setState({image: image})}
      value={this.state.image}
      secureTextEntry={true}
    />
        <Icon style={{textAlign: 'center', marginTop: 10,}}name="check" size={30} color="#ffd700" onPress={() => this.AddPost(this.state.title, this.state.image)}/>
            </View>
            </>

        );
    }


    AddPost(title, image){
    if(title != '' && image != ''){
        var res = this.state.res;
            firebase.firestore().collection('posts').add({
            title: title,
            image: image,
            user: res,
            canDelete: res,
         });
        setTimeout(function(){alert('הפוסט נוצר בהצלחה!')}, 1000);
        this.props.navigation.navigate('Feed');
            } else {
        alert('שדות ריקים!');
             }
            this.setState({title: '', image: ''});

      };

      componentDidMount(){
        this._storeData();

      }

      async _storeData(){
      try {
          await AsyncStorage.getItem('user').then(res => {this.setState({res: res});}).catch(err => {alert('שגיאה: ' + err)});
      } catch (err) {

      }

    }

}



const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        borderBottomWidth: 1,
    },
    button: {
        width: 5,
    },

})


