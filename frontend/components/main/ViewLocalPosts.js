import { FlatList, View, Image, Text, StyleSheet } from "react-native";
import {Dimensions} from 'react-native';

export default function ViewLocalPosts(props) {

    return(
    <View style={styles.containerGallery}>
        {console.log(props.route.params.post)}
    <FlatList numColumns={1} horizontal={false} data={props.route.params.post.downURL} renderItem={({item}) => (
        <Image style={{flex: 1, aspectRatio: 1/1}} source={{uri: item.uri}}/>
    )}/>
    </View>
    )
}

const styles=StyleSheet.create({
    containerGallery: {
        flex: 1
    },
})