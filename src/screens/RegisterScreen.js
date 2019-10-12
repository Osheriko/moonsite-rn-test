import React from 'react';
import Title from '../components/title';
import RegisterForm from '../components/register-form';
import {StyleSheet,View, Button, StatusBar} from 'react-native';


export default class RegisterScreen extends React.Component{
    static navigationOptions = {
        title: 'Register'
       };
    render(){
    return (
        <>
<StatusBar barStyle="dark-content" />
<View style={styles.container}>
  <Title />
  <RegisterForm navigation={this.props.navigation}/>
</View>
</>
    );
}
}


const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        marginTop: 160,
        marginLeft: 50,
        width: 300,
        textAlign: 'center',
    }
})