// import React from 'react';
// import { View, Image } from 'react-native';
// import MapView from 'react-native-maps';

// function MapThree(props) {
    
//     const latitudeDelta = 0.001685339353883819
//     const longitudeDelta = 0.0013193115592002869    
//     let state = {
//         region: {
//             latitudeDelta,
//             longitudeDelta,
//             latitude: 25.102238007918917,
//             longitude: 55.16222594305873,
//         }
//     };
//     const onChangeValue = region =>{
//         alert(JSON.stringify(region))
        
//     };
//     console.log(props);
//   return (
//     // <View><Text>MapThree</Text></View>
//     <View style={{flex : 1}}>
//         <MapView
//         style={{flex:1}}
//         initialRegion = {state.region}
//         onRegionChangeComplete = {onChangeValue}
//         />
//         </View>
//   )
// }
// export default MapThree;

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroBox,

} from '@viro-community/react-viro';


function HelloWorldSceneAR() {
  {console.log("hiii",ararr.route.params.images.length)}
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  const [len, setLen] = useState(ararr.route.params.images.length)

  //akfbkhagfjhabskjhgalbgakj,v

  let ar;
  if (ararr.route.params.images.length == 1){
    ar = <ViroImage
      height={2}
      width={3} 
      source={{uri: ararr.route.params.images[0].uri}}
      position={[0,0,-9]}
    />
  }
  else if (ararr.route.params.images.length == 2){
   ar = <>
  <ViroImage
      height={2}
      width={3} 
      source={{ uri: ararr.route.params.images[0].uri }}
      position={[0, 0, -9]} />
    <ViroImage 
      height={2}
      width={3} 
      source={{ uri: ararr.route.params.images[1].uri }}
      position={[0,3,-9]}
    />
    </>
  
  }
  else if (ararr.route.params.images.length == 3){
    ar = <><ViroImage
      height={2}
      width={3}
      source={{ uri: ararr.route.params.images[0].uri }}
      position={[0, 0, -9]} 
    />
    <ViroImage 
      height={2}
      width={3}
      source={{ uri: ararr.route.params.images[1].uri }}
      position={[0,3,-9]}
    />
    <ViroImage
      height={2}
      width={3}
      source={{ uri: ararr.route.params.images[2].uri }}
      position={[0,-3,-9]}
    />
  </>
  }
  else if(ararr.route.params.images.length == 4){
    ar =<><ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[0].uri }}
    position={[-4, 2, -9]} 
  />
  <ViroImage 
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[1].uri }}
    position={[-4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[2].uri}}
    position={[4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[3].uri}}
    position={[4,-1.5,-9]}
  />
  </>
  }
  else if(ararr.route.params.images.length == 5){
    ar =<><ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[0].uri }}
    position={[0, 0, -9]} 
  />
  <ViroImage 
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[1].uri }}
    position={[-4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[2].uri}}
    position={[4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[3].uri}}
    position={[4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[4].uri}}
    position={[-4,2,-9]}
  />
  </>
  }
  else if(ararr.route.params.images.length == 6){
    ar =<><ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[0].uri }}
    position={[0, 3, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[1].uri }}
    position={[0, -3, -9]} 
  />
  <ViroImage 
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[2].uri }}
    position={[-4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[3].uri}}
    position={[4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[4].uri}}
    position={[4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[5].uri}}
    position={[-4,2,-9]}
  />
  </>
  }
  else if(ararr.route.params.images.length == 7){
    ar =<><ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[0].uri }}
    position={[0, 3, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[1].uri }}
    position={[0, -3, -9]} 
  />
  <ViroImage 
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[2].uri }}
    position={[-4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[3].uri}}
    position={[4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[4].uri}}
    position={[4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[5].uri}}
    position={[-4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[6].uri }}
    position={[0, 0, -9]} 
  />
  </>
  }
  else if(ararr.route.params.images.length == 8){
    ar =<><ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[0].uri }}
    position={[0, 3, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[1].uri }}
    position={[0, -3, -9]} 
  />
  <ViroImage 
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[2].uri }}
    position={[-4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[3].uri}}
    position={[4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[4].uri}}
    position={[4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[5].uri}}
    position={[-4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[6].uri }}
    position={[-8, 0.5, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[7].uri }}
    position={[8, 0.5, -9]} 
  />
  </>
  }
  else if(ararr.route.params.images.length == 9){
    ar = <><ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[0].uri }}
    position={[0, 3, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[1].uri }}
    position={[0, -3, -9]} 
  />
  <ViroImage 
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[2].uri }}
    position={[-4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[3].uri}}
    position={[4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[4].uri}}
    position={[4,-1.5,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{uri: ararr.route.params.images[5].uri}}
    position={[-4,2,-9]}
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[6].uri }}
    position={[-8, 0.5, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[7].uri }}
    position={[8, 0.5, -9]} 
  />
  <ViroImage
    height={2}
    width={3}
    source={{ uri: ararr.route.params.images[8].uri }}
    position={[0, 0, -9]} 
  />
  </>
  }
  else{
    Alert.alert("Posts with Images more than 9 cannot be displayed in AR")
  }

  

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {ar}
      {/* {console.log("hiii  2",props.route.params.images.length)} */}
      {/* <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
  /> */}
      {/* if (condition){

      }
      else if (condtion){

      }
      else{
        
      } */}
      {/* if (len === 1){
        
        <ViroImage
          height={2}
          width={3} 
          source={{uri: ararr.route.params.images[0].uri}}
          position={[0,0,-9]}
        />
      }
      else if (len === 2){
      <>
      <ViroImage
          height={2}
          width={3} 
          source={{ uri: ararr.route.params.images[0].uri }}
          position={[0, 0, -9]} />
        <ViroImage 
          height={2}
          width={3} 
          source={{ uri: ararr.route.params.images[1].uri }}
          position={[0,3,-9]}
        />
      </>
      }
      else if (len === 3){
      <><ViroImage
          height={2}
          width={3}
          source={{ uri: ararr.route.params.images[0].uri }}
          position={[0, 0, -9]} 
        />
        <ViroImage 
          height={2}
          width={3}
          source={{ uri: ararr.route.params.images[1].uri }}
          position={[0,3,-9]}
        />
        <ViroImage
          height={2}
          width={3}
          source={{ uri: ararr.route.params.images[2].uri }}
          position={[0,-3,-9]}
        />
      </>
      }
      else if(len === 4){
      <><ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[-4, 2, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[2].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,-1.5,-9]}
      />
      </>
      }
      else if(len === 5){
      <><ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[0, 0, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[2].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[4].uri}}
        position={[-4,2,-9]}
      />
      </>
      }
      else if(len === 6){
      <><ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[0, 3, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[0, -3, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[2].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[4].uri}}
        position={[4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[5].uri}}
        position={[-4,2,-9]}
      />
      </>
      }
      else if(len === 7){
      <><ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[0, 3, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[0, -3, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[2].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[4].uri}}
        position={[4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[5].uri}}
        position={[-4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[6].uri }}
        position={[0, 0, -9]} 
      />
      </>
      }
      else if(len === 8){
      <><ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[0, 3, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[0, -3, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[2].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[4].uri}}
        position={[4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[5].uri}}
        position={[-4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[6].uri }}
        position={[-8, 0.5, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[7].uri }}
        position={[8, 0.5, -9]} 
      />
      </>
      }
      else if(len === 9){
      <><ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[0, 3, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[0, -3, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[2].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[4].uri}}
        position={[4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[5].uri}}
        position={[-4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[6].uri }}
        position={[-8, 0.5, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[7].uri }}
        position={[8, 0.5, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[8].uri }}
        position={[0, 0, -9]} 
      />
      </>
      }
      else{
        Alert.alert("Posts with Images more than 9 cannot be displayed in AR")
      }
 */}



      {/* <ViroImage
        height={2}
        width={3}
        //placeholderSource={require("/Users/mohamedtahir/Documents/idk just work/plzwork 2/Contra3/contra/frontend/assets/backImage.png")}
        source={{ uri: ararr.route.params.images[2].uri }}
        position={[0,0,-4]}
      /> */}
      {/* <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[0].uri }}
        position={[0, 3, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[1].uri }}
        position={[0, -3, -9]} 
      />
      <ViroImage 
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[2].uri }}
        position={[-4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[3].uri}}
        position={[4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[4].uri}}
        position={[4,-1.5,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{uri: ararr.route.params.images[5].uri}}
        position={[-4,2,-9]}
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[6].uri }}
        position={[-8, 0.5, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[7].uri }}
        position={[8, 0.5, -9]} 
      />
      <ViroImage
        height={2}
        width={3}
        source={{ uri: ararr.route.params.images[8].uri }}
        position={[0, 0, -9]} 
      /> */}




      {/* <ViroImage
        height={2}
        width={3}
        placeholderSource={require("/Users/mohamedtahir/Documents/idk just work/plzwork 2/Contra3/contra/frontend/assets/DSCN1020.JPG")}
        source={{ uri: "https://my_s3_image.jpg" }}
        position={[0,3,-4]}
      />
      <ViroImage
        height={2}
        width={3}
        placeholderSource={require("/Users/mohamedtahir/Documents/idk just work/plzwork 2/Contra3/contra/frontend/assets/DSCN1021.JPG")}
        source={{ uri: "https://my_s3_image.jpg" }}
        position={[4,2,-4]}
      />
      <ViroImage
        height={2}
        width={3}
        placeholderSource={require("/Users/mohamedtahir/Documents/idk just work/plzwork 2/Contra3/contra/frontend/assets/DSCN1026.JPG")}
        source={{ uri: "https://my_s3_image.jpg" }}
        position={[-4,2,-4]}
      /> */}


    </ViroARScene>
  );
};
function MapThreeAR(props) {
  console.log("fhdakgfdkusgdfaug",props.route.params.images.length);
  global.ararr = props;
    return (
        <ViroARSceneNavigator
          autofocus={true}
          initialScene={{
            scene: HelloWorldSceneAR,
          }}
          style={styles.f1}
        />
      );
}

export default MapThreeAR;

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
