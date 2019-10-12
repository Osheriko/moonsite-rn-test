import React from 'react';
import {StyleSheet, View, Text, Button, StatusBar, Image, ScrollView, ToastAndroid} from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import Icon from 'react-native-vector-icons/dist/FontAwesome';




export default class FeedScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {posts: [], images: [], users: [], user: ''};
    }
    static navigationOptions = {
        title: 'Feed',
       };
       
    render(){
        return(
            <ScrollView>
            <View style={{marginBottom: 40, marginTop: 15}}>
            <Icon style={{textAlign: 'center'}} name="plus" onPress={() => this.props.navigation.navigate('AddPost')} size={50} color="#000" />
            </View>
            <View style={styles.container}>
                <View>
            {this.state.posts.map((post, key) => 
               <Button style={styles.posts} title={post} onPress={() => this.handlePost(post)} key={key}></Button>
                )}
                </View>
                <View >
            {this.state.images.map((image, key) => 
               <Image key={key} source={require('../assets/images/banana.jpg')} style={{width: 30, height: 30}}/>
               )}
            <View style={{marginTop: 200, textAlign: 'center'}}>
                <Text>Recent Newcomers & Posters:</Text>
                {this.state.users.map((user, key) => 
               <Text onPress={() => this.handleProfile(user)} key={key}>{user}
               </Text>
                )}
               </View>
               </View>
            </View>
            </ScrollView>
        );
        
    }



    handleProfile(user){
        var res = this.props.navigation.getParam('user');
        if (user == res){
            this.props.navigation.navigate('Profile', {canFollow: false, user: user, currentUser: res});
        } else {
            this.props.navigation.navigate('Profile', {canFollow: true, user: user, currentUser: res});
        }
    }


    handlePost(post){
        var posts = this.state.posts;
        var users = this.state.users;
        var currentUser = this.props.navigation.getParam('user');

        users.forEach(user => {
            if (currentUser == user){
                    this.props.navigation.navigate('Post', {post: post, canDelete: true});
                }     else {
                    this.props.navigation.navigate('Post', {post: post});
                }
            })
        }
     

    componentDidMount(){
        var msg = this.props.navigation.getParam('msg', '');
        if (msg){
        ToastAndroid.showWithGravityAndOffset(
            msg,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }

        this.setState({posts: [], images: [], users: []});
        var posts = [];
        var images = [];
        var users = [];

        firebase.firestore().collection("posts").onSnapshot(querySnapshot => {
            var posts = [];
            var images = [];
            var users = [];
         querySnapshot.forEach(doc => {
            var stack = doc.data();
            for (var i in stack){
                if (i == 'title' && posts.length < 10){
                    posts.push(stack[i]);
                } else if (i == 'image'){
                    images.push(stack[i]);
                } else if(i == 'user' && users.length < 5){
                    users.push(stack[i]);
                }
            }
         })
         this.setState({posts: posts, images: images, users: users});
    });

    }

    componentWillUnmount(){
        var unsubscribe = firebase.firestore().collection("posts")
    .onSnapshot(function (){
      // Respond to data
      // ...
    });

        // Later ...

        // Stop listening to changes
        unsubscribe();
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 3,
    },
    posts: {
        width: 10,
        marginHorizontal: 5,
    }
})