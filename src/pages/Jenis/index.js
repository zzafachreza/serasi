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
import RNFetchBlob from 'rn-fetch-blob';
import { Icon } from 'react-native-elements'
export default function Jenis({ navigation, route }) {
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (isFocused) {
            getData('user').then(u => setUser(u));



        }
    }, [isFocused]);





    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                padding: 10,
                height: 80,
                backgroundColor: colors.primary,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon type='ionicon' name='chevron-back-outline' size={myDimensi / 2} color={colors.white} />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                }}>

                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: myDimensi / 2,
                        color: colors.white,
                        textAlign: 'center',
                        flex: 1,
                    }}>{route.params.nama_direktorat}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: myDimensi / 2,
                        color: colors.white,
                        textAlign: 'center',
                        flex: 1,
                    }}>{route.params.nama_divisi}</Text>
                </View>



            </View>


            <View style={{
                flex: 1,
                padding: 10,
                justifyContent: 'space-around'
            }}>
                <TouchableOpacity

                    onPress={() => navigation.navigate('AADaftar', {
                        fid_divisi: route.params.fid_divisi,
                        nama_direktorat: route.params.nama_direktorat,
                        nama_divisi: route.params.nama_divisi,
                        jenis: 'Daftar Panduan Kerja'
                    })}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.primary,
                        padding: 10,
                        height: windowHeight / 3
                    }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: myDimensi / 0.8,
                        color: colors.white,

                    }}>Daftar Panduan Kerja</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AADaftar', {
                    fid_divisi: route.params.fid_divisi,
                    nama_direktorat: route.params.nama_direktorat,
                    nama_divisi: route.params.nama_divisi,
                    jenis: 'Daftar Kebijakan'
                })} style={{
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.primary,
                    alignItems: 'center',
                    backgroundColor: colors.white,
                    padding: 10,
                    height: windowHeight / 3
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: myDimensi / 0.8,
                        color: colors.primary,

                    }}>Daftar Kebijakan</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})