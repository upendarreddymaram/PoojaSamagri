import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Color from '../../../../infrastruture/theme/color';
import { Picker } from '@react-native-picker/picker';


const PoojaTypeListItem = ({ item, index, category, count, onAddToCart, onIncrease, onDecrease }) => {
    const uniqueKey = `${category}_${index}`;

    const priceString = typeof item.price === 'string' ? item.price : '';
    const quantityString = typeof item.quantity === 'string' ? item.quantity : '';

    const priceOptions = priceString.includes(",") ? priceString.split(",") : [priceString];
    const quantityOptions = quantityString.includes(",") ? quantityString.split(",") : [quantityString];

    const [selectedPrice, setSelectedPrice] = useState(priceOptions[0] || '');
    const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0] || '');

    const imageArray = [
        require("../../../../assets/icons/antimImages/kewda_jal.jpg"),
        require("../../../../assets/icons/antimImages/chandan_lakdi.jpg"),
        require("../../../../assets/icons/antimImages/agarbatti.jpg"),
        require("../../../../assets/icons/Home/laxmidevi_pic.png"),
        require("../../../../assets/icons/antimImages/angocha.jpg"),
        require("../../../../assets/icons/antimImages/baniyan.jpg"),
        require("../../../../assets/icons/antimImages/batasha.jpg"),
        require("../../../../assets/icons/antimImages/blouse.jpg"),
        require("../../../../assets/icons/antimImages/dhoopbatti.jpg"),
        require("../../../../assets/icons/antimImages/itra.jpg"),
        require("../../../../assets/icons/antimImages/ganga_jal.jpg"),
        // require("../../../../assets/icons/Home/image1.png"),
        // require("../../../../assets/icons/Home/image2.png"),
        // require("../../../../assets/icons/Home/image3.png"),
        // require("../../../../assets/icons/Home/image4.png"),
        // require("../../../../assets/icons/Home/image5.png"),
        // require("../../../../assets/icons/Home/image6.png"),
        // require("../../../../assets/icons/Home/image7.png"),
        // require("../../../../assets/icons/Home/image8.png"),
        // require("../../../../assets/icons/Home/image9.png"),
        // require("../../../../assets/icons/Home/image10.png"),
    ];

    // Select the image based on the index
    const imageSource = imageArray[index] || imageArray[0];


    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'orange', padding: 10, borderRadius: 8, marginBottom: 10, position: 'relative' }}>
            <Image source={imageSource} style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10 }} />
            
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'white' }}>{item.item_name}</Text>

                {/* Quantity Dropdown */}
                {quantityOptions.length > 1 ? (
                    <Picker
                        selectedValue={selectedQuantity}
                        onValueChange={(value) => setSelectedQuantity(value)}
                        style={{ color: 'white' }}
                        dropdownIconColor="white"
                    >
                        {quantityOptions.map((qty, idx) => (
                            <Picker.Item key={idx} label={qty} value={qty} />
                        ))}
                    </Picker>
                ) : (
                    <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Roboto-Light' }}>{selectedQuantity}</Text>
                )}

                {/* Price Dropdown */}
                {priceOptions.length > 1 ? (
                    <Picker
                        selectedValue={selectedPrice}
                        onValueChange={(value) => setSelectedPrice(value)}
                        style={{color: 'white' }}
                        dropdownIconColor="white"
                    >
                        {priceOptions.map((price, idx) => (
                            <Picker.Item key={idx} label={price} value={price} />
                        ))}
                    </Picker>
                ) : (
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'white' }}>{selectedPrice}</Text>
                )}
            </View>

            {/* Add to Cart / Counter */}
            {count === 0 ? (
                <TouchableOpacity onPress={() => onAddToCart(uniqueKey)} style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, color: "black", fontFamily: 'Roboto-Medium' }}>Add to Cart</Text>
                </TouchableOpacity>
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", paddingHorizontal: 8, borderRadius: 5 }}>
                    <TouchableOpacity onPress={() => onDecrease(uniqueKey)} style={{ padding: 5, borderRadius: 5 }}>
                        <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: 'orange' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black", marginHorizontal: 20 }}>{count}</Text>
                    <TouchableOpacity onPress={() => onIncrease(uniqueKey)} style={{ padding: 5, borderRadius: 5 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'orange' }}>+</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Checkmark Icon */}
            {count > 0 && (
                <Image resizeMode="contain" source={require('../../../../assets/icons/Home/check.png')} style={{ position: 'absolute', top: -2, right: 0, width: 15, height: 15 }} />
            )}
        </View>
    );
};

// const PoojaTypeListItem = ({ item,index,category, count, onAddToCart, onIncrease, onDecrease }) => {
    
//     const uniqueKey = `${category}_${index}`; 

//     return (

//         <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.orange, padding: 10, borderRadius: 8, marginBottom: 10, position: 'relative' }}>
//             <Image source={require("../../../../assets/icons/Home/laxmidevi_pic.png")} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
//             <View style={{ flex: 1 }}>
//                 <Text style={{ fontSize: 16, fontFamily: 'Roboto-Medium', color: 'white' }}>{item.item_name}</Text>
//                 <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Roboto-Light' }}>{item.quantity}</Text>
//                 <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'white' }}>{item.price}</Text>
//             </View>
//             {count === 0 ? (
//                 <TouchableOpacity onPress={() => onAddToCart(uniqueKey)} style={{ backgroundColor: 'white', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5 }}>
//                     <Text style={{ fontSize: 15, color: "black", fontFamily: 'Roboto-Medium' }}>Add to Cart</Text>
//                 </TouchableOpacity>
//             ) : (
//                 <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "white", paddingHorizontal: 8, borderRadius: 5 }}>
//                     <TouchableOpacity onPress={() => onDecrease(uniqueKey)} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
//                         <Text style={{ fontSize: 18, fontFamily: 'Roboto-Bold', color: 'orange' }}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: "black", marginStart: 20, marginEnd: 20 }}>{count}</Text>
//                     <TouchableOpacity onPress={() => onIncrease(uniqueKey)} style={{ backgroundColor: 'white', padding: 5, borderRadius: 5 }}>
//                         <Text style={{ fontSize: 16, fontFamily: 'Roboto-Bold', color: 'orange' }}>+</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//             {count > 0 &&
//                 <Image resizeMode="contain" source={require('../../../../assets/icons/Home/check.png')} style={{ position: 'absolute', top: -2, right: 0, width: 15, height: 15 }} />
//             }
//         </View>
//     );
// };

export default PoojaTypeListItem;
