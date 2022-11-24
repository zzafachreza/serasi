import { FlatList, Image, Linking, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/colors'
import { apiURL, getData, storeData, urlToken } from '../../utils/localStorage';
import { fonts, myDimensi, windowHeight, windowWidth } from '../../utils/fonts';
import { Icon } from 'react-native-elements'
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
export default function Divisi({ navigation, route }) {
    const isFocused = useIsFocused();
    const [divisi, setDivisi] = useState([]);


    useEffect(() => {
        if (isFocused) {
            getDirektorat(route.params.fid_direktorat);
        }

    }, [isFocused])



    const getDirektorat = (x) => {

        axios.post(apiURL + '1data_divisi.php', {
            fid_direktorat: x
        }).then(zvl => {
            console.log('divisi', zvl.data);
            setDivisi(zvl.data);
        })
    }


    const __divisi = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('AADaftar', {
                fid_divisi: item.id_divisi,
                nama_direktorat: item.nama_direktorat,
                nama_divisi: item.nama_divisi
            })} style={{
                padding: 10,
                backgroundColor: colors.white,
                marginVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.primary,
                marginHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: myDimensi / 2,
                    color: colors.primary,
                    flex: 1,
                }}>{item.nama_divisi}</Text>
                <Icon type='ionicon' name='chevron-forward-outline' size={myDimensi / 2} color={colors.primary} />
            </TouchableOpacity>
        )
    }


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
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: myDimensi / 2.5,
                    color: colors.white,
                    textAlign: 'center',
                    flex: 1,
                }}>{route.params.nama_direktorat}</Text>

            </View>

            <FlatList showsVerticalScrollIndicator={false} data={divisi} renderItem={__divisi} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})