import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { COLORS, FONTS, SIZES, icons } from '../constants'

interface cardProps{
    containerStyle: object, 
    imageStyle: object, 
    item: any, 
    onPress?: () => void
}

const HorizontalFoodCard:React.FC<cardProps> = ({containerStyle, imageStyle, item, onPress}) =>{
    return(
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...containerStyle
            }}
        >
            {/**-------------------------------------IMAGEN-------------------------------------------- */}
            <Image
                source={item.image}
                style={imageStyle}               
            />

            {/**-------------------------------------INFO-------------------------------------------- */}
            <View
                style={{
                    flex: 1
                }}
            >
                {/**NOMBRE */}
                <Text style={{...FONTS.h3, fontSize: 17, fontWeight: 'bold'}}>{item.name}</Text>
                {/**DESCRIPCION */}
                <Text style={{...FONTS.body4, color: COLORS.darkGray2}}>{item.description}</Text>
                {/**PRECIO*/}
                <Text style={{...FONTS.h2, marginTop: SIZES.base }}>${item.price}</Text>
            </View>

            {/**-------------------------------------CALORIAS-------------------------------------------- */}
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 5,
                    right: SIZES.radius
                }}
            >
                <Image
                    source={icons.calories}
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
                <Text style={{color: COLORS.darkGray2, ...FONTS.body5}}>{item.calories} Calorias</Text>
            </View>
        </TouchableOpacity>
    )
}

export default HorizontalFoodCard