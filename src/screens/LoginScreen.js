import React from 'react';
import Title from '../components/title';
import Form from '../components/form';
import {StyleSheet,View, Button, StatusBar} from 'react-native';



export default class LoginScreen extends React.Component{
    static navigationOptions = {
        title: 'Login'
       };
    render(){
    return (
        <>
<StatusBar barStyle="dark-content" />
<View style={styles.container}>
  <Title />
  <Form navigation={this.props.navigation}/>
  <Button title="Create Account" onPress={() => this.props.navigation.navigate('Register')}></Button>
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
    },

})