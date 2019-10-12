import React from 'react';
import {StyleSheet, View, Text, Button, StatusBar, Image} from 'react-native';
import AddPost from '../components/add-post';
import * as firebase from "firebase";
import 'firebase/firestore';
import {AsyncStorage} from 'react-native';

export default class AddPostScreen extends React.Component{

    constructor(){
        super();
        this.state = {post: '', user: '', res: ''};
    }
    static navigationOptions = {
        title: 'Create Post',
       };
       
    render(){

        return(
            <View>
                <AddPost navigation={this.props.navigation}/>
            </View>
        );
        
    }


    componentDidMount(){
        var post = this.props.navigation.getParam('post');
        var user = this.props.navigation.getParam('user');
        this.setState({post: post, user: user});
        this._storeData();
    }

    async _storeData(){
        try{
            await AsyncStorage.getItem('user').then(res => {this.setState({res})}).catch(err => {alert('שגיאה: ' + err)});

        } catch(err){

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