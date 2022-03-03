import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {useDrawerProgress} from '@react-navigation/drawer'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { setSelectedTab } from '../stores/tab/tabActions'

import {
    Home,
    Search,
    CartTab,
    Favourite,
    Notification
} from '../screens'
import { Header } from '../components';
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData
} from '../constants'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Props{
    object: {}
    navigation: any,
    selectedTab: string,
    setSelectedTab: any
}

interface tabProps{
    label: string,
    icon: any,
    isFocused: boolean,
    onPress?: () => void
}

const TabButton: React.FC<tabProps> = ({ label, icon, isFocused, onPress }) =>{
    return(
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <Animated.View
                style={[
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                    },    
                ]}
            >
                <Animated.View
                    style={[
                        {
                            flexDirection: 'row',
                            width: '33%',
                            height: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25
                        },
                    ]}
                >
                    {isFocused ?
                        <Image 
                        source={icon}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.primary
                        }}
                        />
                        :
                        <Image 
                        source={icon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray
                        }}
                        />
                    }
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}


const MainLayout: React.FC<Props> = ( {object, navigation, selectedTab, setSelectedTab} ) => {

    const flatListRef = useRef(null)

    useEffect(() => {
        setSelectedTab(constants.screens.home)
    }, [])

    useEffect(() => {
        switch (selectedTab){
            case constants.screens.home:
                flatListRef.current.scrollToIndex({
                    animated: true,
                    index: 0
                })
                break;
            case constants.screens.search:
                flatListRef?.current?.scrollToIndex({
                    animated: true,
                    index: 1
                })
                break;
            case constants.screens.cart:
                flatListRef?.current?.scrollToIndex({
                    animated: true,
                    index: 2
                })
                break;
            case constants.screens.favourite:
                flatListRef?.current?.scrollToIndex({
                    index: 3
                })
                break;
            case constants.screens.notification:
                flatListRef?.current?.scrollToIndex({
                    index: 4
                })
                break;           
        }

    }, [selectedTab])

    const progress = useDrawerProgress();

    const scale = Animated.interpolateNode(progress as Animated.Node<number>, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolateNode(progress as Animated.Node<number>, {
        inputRange: [0, 1],
        outputRange: [0, 26],
    });
    const animatedStyle = {
        borderRadius,
        transform: [{scale}],
    };
    
    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                ...animatedStyle
            }}
        >
            {/*----------------------------------HEADER----------------------------------- */}
            <Header
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 10,
                    alignItems: 'center'
                }}
                title={selectedTab.toUpperCase()}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={icons.menu} />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',                      
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Image 
                            source={dummyData.myProfile?.profile_image}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius
                            }}
                            />
                    </TouchableOpacity>
                }
            />

            {/*----------------------------------CONTENIDO----------------------------------- */}

            <View
                style={{
                    flex:1
                }}
            >
                <FlatList 
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment='center'
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={(item => `${item.id}`)}
                    renderItem={({item, index}) => {                     
                        return(
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width
                                }}
                            >
                                {item.label == constants.screens.home && <Home/>}
                                {item.label == constants.screens.search && <Search/>}
                                {item.label == constants.screens.cart && <CartTab/>}
                                {item.label == constants.screens.favourite && <Favourite/>}
                                {item.label == constants.screens.notification && <Notification/>}
                            </View>
                        )
                    }}
                />
            </View>
            
            {/*----------------------------------FOOTER----------------------------------- */}

            <View
                style={{
                    flex: 0.12,
                    height: 100,
                    justifyContent: 'flex-end'
                }}
            >
                {/**------------------------------SOMBRA------------------------------ */}
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 4}}
                    colors={[
                        COLORS.transparent,
                        COLORS.gray
                    ]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: 110,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                    }}
                />

                {/**------------------------------TABS------------------------------ */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: 10,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.white
                    }}
                >
                    <TabButton
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}                        
                        onPress={() => setSelectedTab(constants.screens.home)} 
                    />
                    <TabButton
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab == constants.screens.search}
                        onPress={() => setSelectedTab(constants.screens.search)} 
                    />
                    <TabButton
                        label={constants.screens.cart}
                        icon={icons.cart}
                        isFocused={selectedTab == constants.screens.cart}
                        onPress={() => setSelectedTab(constants.screens.cart)} 
                    />
                    <TabButton
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        onPress={() => setSelectedTab(constants.screens.favourite)} 
                    />
                    <TabButton
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => setSelectedTab(constants.screens.notification)} 
                    />
                </View>
            </View>
        </Animated.View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)