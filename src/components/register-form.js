import React from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import * as firebase from "firebase";
import {AsyncStorage} from 'react-native';



export default class RegisterForm extends React.Component{

constructor(){
    super();
    this.state = {email: '', password: '',auth: false};
    this.SignIn = this.SignUp.bind(this);
    this._storeData = this._storeData.bind(this);
}    

    render(){

    return(
        <>

    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder = "Enter Your Email"
      onChangeText={email => this.setState({email: email})}
      value={this.state.email}
    />
    <TextInput
      style={styles.input}
      placeholder = "Enter Your Password"
      onChangeText={password => this.setState({password: password})}
      value={this.state.password}
      secureTextEntry={true}
    />
        <View style={{marginVertical: 10}}>
        <Button style={{marginVertical: 20}} onPress={() => this.SignUp(this.state.email, this.state.password)} title={"Register"}></Button>
    </View>

            </View>
            </>

        );
    }


    SignUp(email, password){
        if(email != '' && password != ''){
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                this._storeData(email);
                this.props.navigation.navigate('Feed', {user: email});
                firebase.firestore().collection('posts').doc(email).set({
                    cantFollow: [],
                    followers: 0,
                    user: email,   
                });
            }).catch(() => {
                alert('שדות אינם תקינים או שהאימייל תפוס');
            });
        } else {
            alert('שדות ריקים!');
        }
        this.setState({email: '', password: ''});
    
          };
        
          async _storeData(email){
          try {
            await  AsyncStorage.setItem('user', email);
          } catch(err) {
    
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


