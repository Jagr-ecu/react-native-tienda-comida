import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    useDrawerProgress 
} from '@react-navigation/drawer'

import { MainLayout } from '../screens'
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from '../constants'
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux'
import { setSelectedTab } from '../stores/tab/tabActions'


interface contentProps{
    navigation: {
        closeDrawer(): void,
        navigate: (path:string) => void
    },
    selectedTab: string,
    setSelectedTab: any
}

interface itemProps{
    label: string,
    icon: any,
    isFocused?: boolean,
    onPress?: () => void
}

interface drawerProps{
    selectedTab: string,
    setSelectedTab: any
}

const Drawer = createDrawerNavigator()

{/** -------------------COMPONENTE DE ITEMS--------------------------------------------------------*/}
const CustomDrawerItem: React.FC<itemProps> = ( {label, icon, isFocused, onPress} ) => {
    return(
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: isFocused ? COLORS.transparentBlack1 : COLORS.primary
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />

            <Text
                style={{
                    marginLeft: 15,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >
                {label} 
            </Text>
        </TouchableOpacity>
    )
}

{/** -------------------COMPONENTE DE CONTENIDO DEL DRAWER--------------------------------------*/}
const CustomDrawerContent: React.FC<contentProps> = ( {navigation, selectedTab, setSelectedTab} ) => {
    return(
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex:1 }}
            >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.radius
                }}
                >
                {/* CERRAR */}
                <View
                    style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                    >
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={ ()=> navigation.closeDrawer() }
                        >
                        <Image
                            source={icons.cross}
                            style={{
                                height:35,
                                width:35,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {/* PERFIL */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                    onPress= { () => console.log("Perfil") }
                    >
                    <Image
                        source={dummyData.myProfile?.profile_image}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />
                    
                    <View
                        style={{
                            marginLeft: SIZES.radius
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}> {dummyData.myProfile?.name} </Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4}}> Ver Perfil </Text>
                    </View>
                </TouchableOpacity>
                {/* DRAWER ITEMS */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding
                    }}
                    >
                    <CustomDrawerItem 
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused = {selectedTab == constants.screens.home}
                        onPress={() => {
                            setSelectedTab(constants.screens.home) 
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem 
                        label={constants.screens.my_wallet}
                        icon={icons.wallet}
                    />
                    <CustomDrawerItem 
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused = {selectedTab == constants.screens.notification}
                        onPress={() => {
                            setSelectedTab(constants.screens.notification) 
                            navigation.navigate("MainLayout")
                        }}
                    />
                    <CustomDrawerItem 
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused = {selectedTab == constants.screens.favourite}
                        onPress={() => {
                            setSelectedTab(constants.screens.favourite) 
                            navigation.navigate("MainLayout")
                        }}
                    />

                    {/**--------LINEA DIVISORA-------------- */}
                    <View 
                        style={{
                            height: 1,
                            marginVertical: SIZES.radius,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray1
                        }}
                    />

                    <CustomDrawerItem 
                        label="Sigue tu pedido"
                        icon={icons.location}
                    />
                    <CustomDrawerItem 
                        label="Cupones"
                        icon={icons.coupon}
                    />
                    <CustomDrawerItem 
                        label="Configuración"
                        icon={icons.setting}
                    />
                    <CustomDrawerItem 
                        label="Invita a un amigo"
                        icon={icons.profile}
                    />
                    <CustomDrawerItem 
                        label="Ayuda"
                        icon={icons.help}
                    />
                </View>

                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <CustomDrawerItem 
                        label="Cerrar Sesión"
                        icon={icons.logout}
                    />
                </View>
                
            </View>
        </DrawerContentScrollView>
    )
}

{/** ------------------------------------COMPONENTE DEL DRAWER-------------------------------------------------------*/}
const CustomDrawer: React.FC<drawerProps> = ( { selectedTab, setSelectedTab} ) => {

    return(
        <View style={{
            flex: 1,
            backgroundColor: COLORS.primary
        }}>
            <Drawer.Navigator 
                initialRouteName='MainLayout'
                drawerContent={props => {
                    return (
                        <CustomDrawerContent
                            navigation = {props.navigation}
                            selectedTab = {selectedTab}
                            setSelectedTab = {setSelectedTab}
                        />
                    )
                }}
                screenOptions={{
                    title: '',
                    headerShown: false,
                    drawerType: 'slide',
                    overlayColor: 'transparent',
                    drawerStyle:{
                        flex: 1,
                        width: '65%',
                        paddingRight: 20,
                        backgroundColor: 'transparent'
                    },
                    sceneContainerStyle: {
                        backgroundColor: 'transparent'
                    },
                    
                }}>
                <Drawer.Screen name='MainLayout'>
                    {props => <MainLayout {...props}/>}
                </Drawer.Screen>
            </Drawer.Navigator> 
        </View>
    )
}

function mapStateToProps(state:any) {
    return{
        selectedTab: state.tabReducer.selectedTab
    }
}

function mapDispatchToProps(dispatch:any){
    return{
        setSelectedTab: (selectedTab:string) => {
            return dispatch(setSelectedTab(selectedTab))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer)