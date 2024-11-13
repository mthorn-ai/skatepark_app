import React, { useEffect } from 'react';
import { Suspense, useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, Button, Text, View, Image, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import Post from '../../components/Post';
import { migrate } from '../../scripts/dbManagement';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";
import type { PropsWithChildren, ReactElement } from 'react';

type PostInfo = PropsWithChildren<{
  comment: string
  imgURL: string
  likes: number
  comments: number
}>;

export default function Home() {
  
  return (
    <View
      style={{
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense fallback={<Text>Loading. . .</Text>}>
        <SQLiteProvider databaseName="myDatabase.db" onInit={migrate} useSuspense>
          <Page/>
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

function Page() {
  const router = useRouter();
  const db = useSQLiteContext();

  const [posts, changePosts] = useState<PostInfo[]>();
  
  const getPosts = async () => {
    const posts = await db.getAllAsync<PostInfo>('SELECT * FROM posts');
    changePosts(posts);
  };
  
  useEffect(() => {
    getPosts();
  });
  
  const displayPosts = () => {
    if (posts) {
      let myPosts: ReactElement[] = []
      posts.forEach((post) => {
        const element = (<Post 
          comment={post.comment}
          imgURL={post.imgURL}
          likes={post.likes}
          comments={post.comments}
        />);
        myPosts.push(element);
      });

      return myPosts;
    };

    return;
  };
  
  return (
    <SafeAreaProvider>
      <View style={styles.parentContainer}>
        <View style={styles.topContainer}>
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <Button 
              onPress={ () => router.navigate('../')} // onPress={loginHandle}
              title='logout'
              color={"transparent"} 
            />
          </View>
          <Image
            style={styles.logo}
            source={require('../../assets/images/app_logo.png')}
            resizeMode="contain"
          />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity> 
              <AntDesign name="user" size={48}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView style={styles.scrollView}>
          {displayPosts()}

          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row'}}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp2.png')}
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
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
            </Text>
            <Image
            style={styles.imgStyle}
            source={require('../../assets/images/post_img2.jpg')}
            />
            <View style={styles.likeBarInPic}>
              <AntDesign name="like2" size={20} color={'white'}/>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>  123    </Text>
              <AntDesign name="message1" size={20} color={'white'}/>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>  12</Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row'}}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp3.png')}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Text>
            <View style={styles.likeBar}>
              <AntDesign name="like2" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  123    </Text>
              <AntDesign name="message1" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  12</Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row'}}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp4.png')}
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
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View style={styles.likeBar}>
              <AntDesign name="like2" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  123    </Text>
              <AntDesign name="message1" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  12</Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row'}}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp5.png')}
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
            Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            </Text>
            <Image
            style={styles.imgStyle}
            source={require('../../assets/images/post_img3.jpg')}
            />
            <View style={styles.likeBarInPic}>
              <AntDesign name="like2" size={20} color={'white'}/>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>  123    </Text>
              <AntDesign name="message1" size={20} color={'white'}/>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>  12</Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row'}}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp6.png')}
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
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View style={styles.likeBar}>
              <AntDesign name="like2" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  123    </Text>
              <AntDesign name="message1" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  12</Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <View style={{flexDirection: 'row'}}>
            <Image 
              style={styles.profilePic}
              source={require('../../assets/images/pfp7.png')}
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
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <View style={styles.likeBar}>
              <AntDesign name="like2" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  123    </Text>
              <AntDesign name="message1" size={20} color={'black'}/>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>  12</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity> 
              <AntDesign name="bells" size={40}/>
            </TouchableOpacity> 
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity>
              <AntDesign name="pluscircle" size={50}/>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity>
              <AntDesign name="message1" size={40}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}




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
