import { FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, storeData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import MyCarouser from '../../components/MyCarouser';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from 'react-native';
export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const [direktorat, setDirektorat] = useState([]);
  const [produk, setProduk] = useState([]);
  const [best, setBest] = useState({});
  const [cart, setCart] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);
      console.log(obj);
      PushNotification.localNotification({
        channelId: 'serasi', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });

    });




    getData('user').then(u => {
      setUser(u);
      UpdateToken(u.id);
    });

    getDirektorat();

    return unsubscribe;



  }, [isFocused]);




  const UpdateToken = (id) => {

    // getData('token').then(res => {
    //   // console.log('tokenSAYA', res.token);
    //   axios.post(apiURL + 'v1_token_update.php', {
    //     api_token: urlToken,
    //     id: id,
    //     token: res.token
    //   }).then(zvl => {
    //     // console.log('UPDATE TOKEN', zvl.data)
    //   })
    // })


  }

  const getDirektorat = () => {

    axios.post(apiURL + '1data_direktorat.php').then(zvl => {
      setDirektorat(zvl.data);
    })
  }




  const __direktorat = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Divisi', {
        fid_direktorat: item.id_direktorat,
        nama_direktorat: item.nama_direktorat
      })} style={{
        padding: 10,
        backgroundColor: colors.primary,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: myDimensi / 2,
          color: colors.white,
          flex: 1,
        }}>{item.nama_direktorat}</Text>
        <Icon type='ionicon' name='chevron-forward-outline' size={myDimensi / 2} color={colors.white} />
      </TouchableOpacity>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        flexDirection: 'row',
        height: windowHeight / 9,
      }}>
        <View style={{
          flex: 1,
          padding: 5,
        }}>
          <Text style={{
            fontFamily: fonts.primary[400],
            fontSize: myDimensi / 2,
            color: colors.white
          }}>Halo, <Text style={{
            fontFamily: fonts.primary[600],
            fontSize: myDimensi / 2
          }}>{user.nama_lengkap}</Text></Text>
          <Image source={require('../../assets/logo.png')} style={{
            width: 100,
            height: 50,
          }} />
        </View>



      </View>

      <View>
        <View style={{
          position: 'relative',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
          <View style={{
            position: 'absolute',
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%', padding: 10,
          }}>
            <Icon name='search' light size={myDimensi / 1.6} color={colors.primary} />
          </View>
          <TextInput onFocus={
            () => navigation.navigate('AADaftar', {
              jenis: 'Semua'
            })
          } placeholderTextColor={colors.primary}

            style={{
              borderWidth: 1,
              borderColor: colors.primary,
              color: colors.black,
              borderRadius: 10,
              fontSize: myDimensi / 2,
              paddingLeft: 35,
              paddingTop: 12,
              fontFamily: fonts.primary.normal
            }}
            placeholder="Quick search SOP/Kebijakan"

          />
        </View>
      </View>
      {/* slider */}
      <MyCarouser />


      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList data={direktorat} renderItem={__direktorat} />
      </ScrollView>






    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})