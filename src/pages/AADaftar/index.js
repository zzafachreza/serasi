import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback,
    Image,
    Linking,
    ActivityIndicator,
    Alert,
    Keyboard,
    TextInput,
    PermissionsAndroid,
} from 'react-native';

import { apiURL, getData, storeData, urlAPI, urlToken } from '../../utils/localStorage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyButton, MyInput, MyPicker } from '../../components';
import { colors } from '../../utils/colors';
import { TouchableOpacity, Swipeable } from 'react-native-gesture-handler';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { useIsFocused } from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { showMessage } from 'react-native-flash-message';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
export default function AADaftar({ navigation, route }) {
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (isFocused) {
            getData('user').then(u => {
                console.log(u);
                setUser(u)
            });

            _getDataTransaction(route.params.fid_divisi, route.params.jenis);

        }
    }, [isFocused]);


    const _getDataTransaction = (uid, jenis) => {

        axios.post(apiURL + '1data_dokumen.php', {
            fid_divisi: uid,
            jenis: jenis

        }).then(res => {
            // console.warn('data dokument', res.data);
            setData(res.data);
        })

    }


    const _getDataTransactionKey = (key, fid_divisi = route.params.fid_divisi, jenis = route.params.jenis) => {

        axios.post(apiURL + '1data_dokumen.php', {
            fid_divisi: fid_divisi,
            key: key,
            jenis: jenis
        }).then(res => {
            console.warn(res.data);
            setData(res.data);
        })

    }

    const [key, setKey] = useState('');




    const downloadHistory = async (url, nama_file, exe) => {

        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.DownloadDir;
        let date = new Date();
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/' + nama_file + '.' + exe,
                description: nama_file,
            },
        };
        config(options)
            .fetch('GET', url)
            .then((res) => {
                // success
                showMessage({
                    message: 'File berhasil di unduh',
                    type: 'success'
                })
            })
            .catch((error) => {
                // error
                console.warn(error)
            });

    }


    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10,
            backgroundColor: colors.white
        }}>

            <View>
                <View style={{
                    position: 'relative',
                    marginBottom: 10,
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
                    <TextInput placeholderTextColor={colors.border_form} onSubmitEditing={e => _getDataTransactionKey(e.nativeEvent.text)} autoCapitalize='none' value={key} onChangeText={x => setKey(x)}

                        style={{
                            borderWidth: 1,
                            borderColor: colors.border_form,
                            color: colors.black,
                            borderRadius: 10,
                            fontSize: myDimensi / 2,
                            paddingLeft: 35,
                            paddingTop: 12,
                            fontFamily: fonts.primary.normal
                        }}
                        placeholder="Masukan kata kunci"
                    />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(i => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            paddingBottom: 10,
                            borderBottomColor: colors.border_card
                        }}>

                            <View style={{
                                flex: 1,
                                paddingLeft: 10,
                            }}>

                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: myDimensi / 3,
                                    color: colors.black
                                }}>{i.jenis}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    fontSize: myDimensi / 3,
                                    color: colors.primary
                                }}>{i.judul}</Text>


                                <Text style={{
                                    fontFamily: fonts.primary[200],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.black
                                }}>{i.deskripsi_permintaan}</Text>

                            </View>


                            <TouchableOpacity onPress={() => {

                                navigation.navigate('AAMasuk', {
                                    fid_divisi: route.params.fid_divisi,
                                    nama_direktorat: route.params.nama_direktorat,
                                    nama_divisi: route.params.nama_divisi,
                                    id_dokumen: i.id_dokumen,
                                    judul: i.judul,
                                    jenis: i.jenis,
                                    url: i.url
                                })

                            }} style={{
                                marginRight: 5,
                                backgroundColor: colors.primary,
                                width: 70,
                                paddingVertical: 5,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}>
                                <Icon name='eye' color={colors.white} />
                                <Text style={{
                                    left: 2,
                                    fontFamily: fonts.secondary[400],
                                    fontSize: myDimensi / 2.5,
                                    color: colors.white
                                }}>Lihat</Text>
                            </TouchableOpacity>

                            {user.unduh == 1 &&


                                <TouchableOpacity onPress={() => {

                                    Alert.alert(
                                        "SERASI",
                                        "Unduh dokumen ini ?",
                                        [
                                            {
                                                text: "Cancel",
                                                style: "cancel",
                                            },
                                            {
                                                text: "OK", onPress: () => {

                                                    PermissionsAndroid.request(
                                                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                                                        {
                                                            title: 'storage title',
                                                            message: 'storage_permission',
                                                        },
                                                    ).then(granted => {
                                                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                                            //Once user grant the permission start downloading
                                                            console.log('Storage Permission Granted.');
                                                            downloadHistory(i.url, i.judul, 'pdf');
                                                            // Linking.openURL(i.url)
                                                        } else {
                                                            //If permission denied then show alert 'Storage Permission 
                                                            Alert.alert('storage_permission');
                                                        }
                                                    });
                                                }
                                            }
                                        ],

                                    );


                                }} style={{
                                    backgroundColor: colors.secondary,
                                    width: 80,
                                    paddingVertical: 5,
                                    borderRadius: 10,
                                    justifyContent: 'center',

                                    flexDirection: 'row'
                                }}>
                                    <Icon name='download' color={colors.white} />
                                    <Text style={{
                                        left: 5,
                                        fontFamily: fonts.secondary[400],
                                        fontSize: myDimensi / 2.5,
                                        color: colors.white
                                    }}>Unduh</Text>
                                </TouchableOpacity>


                            }




                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})