import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Icon } from "react-native-paper";

export const nextButtonState = (icons, currentState) => {
    // console.log(currentState);
    let id = icons
        .map((item, key) => ({ ...item, id: key }))
        .filter((item) => currentState === item.state)[0].id;
    return icons[(id + 1) % icons.length].state;
};

export const MultiStateButton = ({ icons, state, onPress, size, style }) => {
    const [id, setId] = useState(0);
    const onChange = () => {
        onPress();
    };
    
    useEffect(
        () =>{
            return setId(
                icons
                    .map((item, key) => ({ ...item, id: key }))
                    .filter((item) => state === item.state)[0].id
            );},
        [state]
    );

    return (
        <Pressable style={style} onPress={onChange}>
            <Icon source={icons[id].icon} color={icons[id].color} size={size} />
        </Pressable>
    );
};
