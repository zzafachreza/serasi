import { FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, storeData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { useIsFocused } from '@react-navigation/native';
import { MyGap } from '../../components';

export default function Outlet() {
    const [comp, setComp] = useState({});
    useEffect(() => {
        if (isFocused) {
            getComp();
        }
    }, [isFocused])

    const isFocused = useIsFocused();

    const getComp = () => {
        axios.post(apiURL + 'company.php').then(res => {
            console.log('comapany', res.data)
            setComp(res.data);
        })
    }

    return (
        <View style={{
            backgroundColor: colors.white,
            flex: 1,
            padding: 10,
        }}>
            <Image source={require('../../assets/logo.png')} style={{

                height: myDimensi / 0.4,
                width: 150,
                margin: 10,
                alignSelf: 'center'
            }} />

            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: myDimensi / 2.5,
                color: colors.black,
                textAlign: 'center'
            }}>{comp.deskripsi}</Text>
            <MyGap jarak={10} />
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: myDimensi / 2.5,
                color: colors.black
            }}>Alamat</Text>
            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: myDimensi / 2.5,
                color: colors.black
            }}>{comp.alamat}</Text>
            <MyGap jarak={10} />
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: myDimensi / 2.5,
                color: colors.black
            }}>Telepon</Text>
            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: myDimensi / 2.5,
                color: colors.black
            }}>{comp.tlp}</Text>

            <MyGap jarak={10} />
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: myDimensi / 2.5,
                color: colors.black
            }}>Email</Text>
            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: myDimensi / 2.5,
                color: colors.black
            }}>{comp.email}</Text>

        </View>
    )
}

const styles = StyleSheet.create({})