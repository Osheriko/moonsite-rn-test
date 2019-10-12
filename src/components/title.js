import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export default class Title extends React.Component {
    render(){

        return(
            <View>
                
   <Text style={styles.title}>Top 9 <Icon name="star" size={30} color="#ffd700" /> </Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 30,
    }
})