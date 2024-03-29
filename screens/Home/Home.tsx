import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { useEvent } from 'react-native-reanimated';

import { HorizontalFoodCard } from '../../components/index'
import  VerticalFoodCard  from '../../components/VerticalFoodCard'
import { FONTS, SIZES, COLORS, icons, dummyData } from '../../constants';

interface sectionProps{
    title: string, 
    onPress?: () => void
}

const Section:React.FC<sectionProps> = ( {title, onPress, children} ) => {
    return(
        <View>
            {/*Header*/}
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    marginTop: 30,
                    marginBottom: 20
                }}
            >
                <Text style={{ flex: 1, fontWeight: 'bold', ...FONTS.h3 }}>
                    {title}
                </Text>

                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: COLORS.primary, ...FONTS.body3 }} >
                        Mostrar Todo
                    </Text>
                </TouchableOpacity>
            </View>
            {/*Content*/}
            {children}
        </View>
    )
} 

const Home = () => {

    const [selectedCategoryId, setSelectedCategoryId] = useState(1)
    const [selectedMenuType, setSelectedMenuType] = useState(1)
    const [popular, setPopular] = useState<any>([])
    const [recommends, setRecommends] = useState<any>([])
    const [menuList, setMenuList] = useState<any>([])

    const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    function handleChangeCategory(categoryId: number, menuTypeId: number){
        //Recuperar el menu popular
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular")

        //Recuperar el menu recomendado
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recomendado")

        //Busca el menu basado en el id del tipo de menu 'menuTypeId'  
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId)

        //Establece el menu de populares acorde al categoryId
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)))

        //Establece el menu de recomendados acorde al categoryId
        setRecommends(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)))

        //Establece el menu basado en la categoryId
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    }

    function renderSearch() {
        return (
            <View
                style={{
                    flexDirection: 'row',                   
                    height: 40,
                    alignItems: 'center',
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2

                }}
            >
                {/**------------------------------------------ICONO DE BUSQUEDA----------------------------------- */}
                <Image
                    source={icons.search}
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.black
                    }}
                />

                {/**------------------------------------------TEXTO DE ENTRADA----------------------------------- */}
                <TextInput
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder='Busca comida...'
                />

                {/**------------------------------------------BOTON DE FILTRO----------------------------------- */}
                <TouchableOpacity
                //onPress
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.black
                        }}
                    />             
                </TouchableOpacity>
            </View>
        )
    }

    function renderMenuTypes(){
        return(
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={(item => `${item.id}`)}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({item, index}) => (
                    
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setSelectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}
                    >
                        <Text 
                            style={{ 
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3 
                            }}

                        >{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderRecommendedSection(){
        return(
            <Section
                title="Recomendado"
                onPress={() => console.log("Mostrar todos los recomendado")}
            > 
                <FlatList
                    data={recommends}
                    keyExtractor={(item => `${item.id}`)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 180,
                                width: SIZES.width * 0.85,               
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center',
                            }}
                            imageStyle={{
                                marginTop: 35,
                                height: 150,
                                width: 150 
                            }}
                            item={item}
                            onPress={() => console.log("HorizontalFoodCard")}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderPopularSection(){
        return(
            <Section
                title='Popular cerca de ti'
                onPress={() => console.log("Muestra todo popular")}
            >
                <FlatList
                    data={popular}
                    keyExtractor={(item => `${item.id}`)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (      
                        <VerticalFoodCard
                            containerStyle={{             
                                marginLeft: index == 0 ? SIZES.padding : 18,
                                marginRight: index == recommends.length - 1 ? SIZES.padding : 0,
                            }}
                            item={item}
                            onPress={() => console.log("HorizontalFoodCard")}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderFoodCategories(){
        return(
            <FlatList
                data={dummyData.categories}
                keyExtractor={(item => `${item.id}`)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (      
                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
                        }}
                        onPress={() => {
                            setSelectedCategoryId(item.id)
                            handleChangeCategory(item.id, selectedMenuType)
                        }}
                    >
                        <Image
                            source={item.icon}
                            style={{
                                marginTop: 5,
                                height: 50,
                                width: 50
                            }}
                        />

                        <Text
                            style={{
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS. darkGray,
                                ...FONTS.h3
                            }}
                        >{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/** ----------------------------------------BUSQUEDA-------------------------------------------*/}
            {renderSearch()}
            {/** ----------------------------------------LISTA-------------------------------------------*/}
            <FlatList
                data={menuList}
                keyExtractor={(item => `${item.id}`)}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/**Seccion de categorias de comida*/}
                        {renderFoodCategories()}

                        {/**Seccion de populares */}
                        {renderPopularSection()}

                        {/**Seccion de recomendados */}
                        {renderRecommendedSection()}

                        {/*Menu de tipos*/}
                        {renderMenuTypes()}
                    </View>
                }
                renderItem={({item, index}) => {
                    return(
                        <HorizontalFoodCard
                            containerStyle={{
                                height: 130,
                                alignItems: 'center',
                                marginHorizontal: SIZES.padding,
                                marginBottom: SIZES.radius 
                            }}
                            imageStyle={{
                                marginTop: 20,
                                height: 110,
                                width: 110 
                            }}
                            item={item}
                            onPress={() => console.log("HorizontalFoodCard")}
                        />
                            
                    )
                }}
            />
        </View>
    )
}

export default Home;