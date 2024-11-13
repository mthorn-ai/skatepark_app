import { StyleSheet, Button, Text, View, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import type { PropsWithChildren } from 'react';

type PostInfo = PropsWithChildren<{
  comment: string
  imgURL: string
  likes: number
  comments: number
}>;

export default function Post({
  comment,
  imgURL,
  likes,
  comments
}: PostInfo) {
  return (
    <View style={styles.postContainer}>
      <View style={{flexDirection: 'row'}}>
        <Image 
          style={styles.profilePic}
          source={require('../assets/images/pfp1.png')}
        />
        <View style={{flexDirection: 'column', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>
            Name
          </Text>
          <Text>
            @username
          </Text>
        </View>
      </View>
      <Text style={styles.text}>
        {comment ? comment : ""}
        {/* this skatepark is really fun */}
      </Text>
      <Image
        style={styles.imgStyle}
        source={require('../assets/images/pfp6.png')} //'../../assets/images/post_img.jpg'
      />
      <View style={styles.likeBarInPic}>
        <AntDesign name="like2" size={20} color={'white'}/>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{likes != null ? likes : 0}</Text>
        <AntDesign name="message1" size={20} color={'white'}/>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{comments != null ? comments : 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  likeBar: {
    flexDirection:'row',
    marginTop:10,
  },
  likeBarInPic: {
    flexDirection:'row', 
    position: 'absolute', 
    bottom: -10, 
    left: -10, 
    backgroundColor:'black', 
    paddingLeft:20,
    paddingBottom:20,
    paddingTop:10,
    paddingRight:10,
    borderRadius:10,
  },
  imgStyle: {
    resizeMode:'contain', 
    width:'200%',
    height:'100%',
    alignSelf:'center',
    marginTop:10,
  },
  profilePic: {
    width: 40,
    height: 40,
  },
  postContainer: {
    width: 370,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    maxHeight: 450,
    overflow:'hidden',
  },
  parentContainer: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center',
    height: 100,
    backgroundColor: '#AB9B59',
    padding: 10,
  },
  scrollView: {
    backgroundColor: '#C4AA3F',
    padding: 20,
  },
  bottomButtonContainer: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: "#EBE2C0",
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 75,
    height: 75,
    borderWidth: 1,
    alignSelf: 'center',
    flex: 1,
  },
  text: {
    fontSize: 15,
    marginTop: 10,
  },
});
