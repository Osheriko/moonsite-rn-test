import React from 'react';
import {StyleSheet, View, Text, Button, StatusBar, Image} from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import {AsyncStorage} from 'react-native';

export default class PostScreen extends React.Component{

    constructor(){
        super();
        this.state = {post: '', user: '', res: '', canDelete: false};
        this._storeData = this._storeData.bind(this);
    }
    static navigationOptions = {
        title: 'Post',
       };
       
    render(){

        return(
            <View>
               <Text>{this.state.post}</Text>
               <Image source={require('../assets/images/banana.jpg')} style={{width: 66, height: 58}}/>
               {(this.state.canDelete) ? <Button title="Delete Post" onPress={() => this.deletePost()}></Button> : false}
            </View>
        );
        
    }

    deletePost(){
        var post = this.state.post;
        var res = this.state.res;
        firebase.firestore().collection("posts").doc(res).delete().then(function() {
            setTimeout(() => alert("הפוסט נמחק בהצלחה!"), 3000);
            this.props.navigation.navigate('Feed');
        }).catch(function(error) {
            alert("שגיאה: ", error);
        })        
    }

    componentDidMount(){
        var post = this.props.navigation.getParam('post', false);
        var canDelete = this.props.navigation.getParam('canDelete', false);
        this.setState({post: post, canDelete: canDelete});
        this._storeData();
        

    }

    async _storeData(){
        try {
        AsyncStorage.getItem('user').then(res => {this.setState({res})}).catch(err => {alert('שגיאה: ' + err)});
        this.setState({res: res});
        } catch(err) {

        }
  }

}

const styles = StyleSheet.create({
    container: {
        width: 100,
        marginBottom: 5,
    },
    posts: {
        width: 10,
        marginHorizontal: 5,
    }
})