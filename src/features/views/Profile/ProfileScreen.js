import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Modal, TouchableWithoutFeedback, Button, TextInput, StatusBar } from 'react-native';
import Color from '../../../infrastruture/theme/color';
import AddAddressSheet from './components/AddAddressSheet';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {

    const screenWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const [addressBtmSheetVisible, setaddressBtmSheetVisible] = useState(false);
    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState("");

    const navigatetoHome = () => {
        navigation.navigate('HOME')
    };

    const handleYourAddress = () => {
        closeBottomSheet();
        navigation.navigate('ADDADDRESS')
    };

    const handleYourTransactions = () => {
        navigation.navigate('ADDPAYMENT')
    };

    const handleLogout = async () => {
        try {
            await auth().signOut();
            AsyncStorage.clear();
            navigation.reset({
                index: 0,
                routes: [{ name: 'LOGIN' }],
            });
        } catch (error) {
            console.log('Error logging out: ', error);
        }
    };


    const openBottomSheet = () => setaddressBtmSheetVisible(true);
    const closeBottomSheet = () => setaddressBtmSheetVisible(false);


    useEffect(() => {
        fetchUserData();

        const subscriber = auth().onAuthStateChanged((authenticatedUser) => {
            if (authenticatedUser) {
                setUser(authenticatedUser);
                setName(authenticatedUser.displayName || "");
            }
        });

        return subscriber;
    }, []);

    const fetchUserData = async () => {
        const currentUser = auth().currentUser;
        if (currentUser) {
            await currentUser.reload();
            setUser(auth().currentUser);
        }
    };

    const updateUserName = async () => {
        if (name.trim() === "") return;
        try {
            await auth().currentUser.updateProfile({ displayName: name });
            await fetchUserData();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={Color.profile_blue} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, height: 60, backgroundColor: '#f5f5f5', borderBottomWidth: 1, borderBottomColor: '#ddd', }}>
                    <TouchableOpacity onPress={() => navigatetoHome()} style={{ flex: 1 }}>
                        <Text>
                            <Image
                                source={require('../../../assets/icons/Home/Left.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontFamily:"Roboto-Bold", textAlign: 'center', }}>Profile</Text>
                    <View style={{ flex: 1 }} />
                </View> */}

                <View style={{ alignItems: 'center', borderBottomRightRadius: 35, borderBottomLeftRadius: 35, backgroundColor: Color.profile_blue, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                    <TouchableOpacity onPress={() => navigatetoHome()} style={{ flex: 1, alignSelf: 'flex-start', padding: 10, marginHorizontal: 20 }} >
                        <Text>
                            <Image
                                source={require('../../../assets/icons/Home/Left.png')}
                                style={{ width: 30, height: 30, tintColor: 'white' }}
                            />
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: screenWidth * 0.9, borderRadius: 10, padding: 20, flexDirection: 'row', alignItems: 'center', }}>
                        <Image
                            source={require('../../../assets/icons/Home/profile.png')} resizeMode='contain'
                            style={{ width: 80, height: 80, borderRadius: 30, marginRight: 15, tintColor: "white" }} />
                        {/* <View style={{ flexDirection: 'column', marginHorizontal: 10, justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 20, color: "white", fontFamily: 'Roboto-Bold' }}> Upendar</Text>
                            <Text style={{ fontSize: 20, color: "white", fontFamily: 'Roboto-Medium' }}>45234 567 890</Text>
                        </View> */}
                        <View style={{ flexDirection: "column", marginHorizontal: 10, justifyContent: "flex-start" }}>
                            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => setIsModalVisible(true)}>
                                <Text style={{ fontSize: 24, color: "white", fontFamily: "Roboto-Medium" }}>{user?.displayName ? user.displayName : "Add Name"}</Text>
                                <Image source={require('../../../assets/icons/Profile/edit.png')} style={{ width: 15, height: 15, tintColor: 'white', marginStart: 20 }} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 20, color: "white", fontFamily: "Roboto-Medium" }}>{user?.phoneNumber || "Add Phone Number"}</Text>

                            <Modal
                                visible={isModalVisible}
                                transparent
                                animationType="fade"
                                onRequestClose={() => setIsModalVisible(false)}
                            >
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", }}>
                                    <View style={{ width: "80%", backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center", }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, }}>Update Name</Text>
                                        <TextInput
                                            value={name}
                                            onChangeText={setName}
                                            placeholder="Enter Name"
                                            style={{ width: "100%", borderWidth: 1, fontFamily: "Roboto-Medium", fontSize: 20, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10, }}
                                        />
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", }}>
                                            <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="red" />
                                            <Button title="Save" onPress={updateUserName} />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    </View>
                </View>

                <View style={{ paddingVertical: 30, paddingHorizontal: 20, flex: 1 }}>
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold' }}>My Activity</Text>
                    </View>

                    <View style={{ borderBottomWidth: 1, borderBottomColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}
                        onPress={() => openBottomSheet()}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/icons/Profile/Location.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                            />
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>My Address</Text>
                        </View>
                        <Image
                            source={require('../../../assets/icons/Profile/Forward.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>

                    <View style={{ borderBottomWidth: 1, borderBottomColor: Color.primary_grey, marginVertical: 10 }} />

                    {/* <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}
                        onPress={() => handleYourTransactions()}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/icons/Profile/Transaction.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                            />
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>My Transactions</Text>
                        </View>
                        <Image
                            source={require('../../../assets/icons/Profile/Forward.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity> */}

                    {/* <View style={{ borderBottomWidth: 1, borderBottomColor: Color.primary_grey, marginVertical: 10 }} /> */}


                    <View style={{ marginTop: 30, marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Roboto-Bold' }}>About Us</Text>
                    </View>

                    <View style={{ borderBottomWidth: 1, borderBottomColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}
                        onPress={() => console.log('Item clicked')}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/icons/Profile/terms.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                            />
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>Terms and Conditions</Text>
                        </View>
                        <Image
                            source={require('../../../assets/icons/Profile/Forward.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>

                    <View style={{ borderBottomWidth: 1, borderBottomColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}
                        onPress={() => console.log('Item clicked')}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/icons/Profile/contact.png')}
                                style={{ width: 35, height: 35, marginRight: 15 }}
                            />
                            <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium' }}>Contact Us</Text>
                        </View>
                        <Image
                            source={require('../../../assets/icons/Profile/Forward.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </TouchableOpacity>

                    <View style={{ borderBottomWidth: 1, borderBottomColor: Color.primary_grey, marginVertical: 10 }} />

                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLogout} style={{ width: '80%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary_black, padding: 15, margin: 10, }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'white', fontFamily: 'Roboto-Bold' }}>Log Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <AddAddressSheet
                visible={addressBtmSheetVisible}
                close={closeBottomSheet}
            />

            {/* <Modal
                visible={addressBtmSheetVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeBottomSheet}
            >
                <TouchableWithoutFeedback onPress={closeBottomSheet}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                </TouchableWithoutFeedback>

                <View style={{ backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 20, position: 'absolute', bottom: 0, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', elevation: 5, justifyContent: 'space-between' }}>
                        <Image resizeMode='contain' source={require('../../../assets/icons/Home/Left.png')} style={{ width: 40, height: 40 }} />
                        <Text style={{ position: 'absolute', left: '50%', transform: [{ translateX: '-50 %' }], fontSize: 16, fontFamily: 'Roboto-Medium', textAlign: 'center', color: "black" }}>Select an Address</Text>
                    </View>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity onPress={() => handleYourAddress()} style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', }}>
                        <Image source={require('../../../assets/icons/Profile/add.png')} style={{ width: 25, height: 25, marginRight: 20 }} />
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}>Add new Address</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                    <Text style={{ fontSize: 15, fontFamily: 'Roboto-Bold', color: "black", }} >Saved Address</Text>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} >
                        <Image resizeMode='contain' source={require('../../../assets/icons/Profile/Location.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}> Hyderabad, Telangana</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} >
                        <Image resizeMode='contain' source={require('../../../assets/icons/Profile/Location.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}> Hyderabad, Telangana</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', }} >
                        <Image resizeMode='contain' source={require('../../../assets/icons/Profile/Location.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: "black" }}> Hyderabad, Telangana</Text>
                    </TouchableOpacity>

                    <View style={{ height: 1, backgroundColor: Color.primary_grey, marginVertical: 10 }} />

                </View>
            </Modal> */}

        </SafeAreaView>
    );
};



export default ProfileScreen;