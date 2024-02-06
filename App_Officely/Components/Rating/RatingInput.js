import { useState } from "react";
import { View, Text } from "react-native";
import { Button, Card, IconButton, TextInput } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { useDispatch } from "react-redux";

import { ThemeColors } from "../Utils/Colors";
import { updateRating } from "../../redux/thunk";

const RatingInput = ({officeId}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const sendComment = ()=>{
        dispatch(updateRating(officeId, rating, comment));
    }
    return (
        <View
            style={{
                marginHorizontal: 10,
                alignContent: "baseline",
                justifyContent: "flex-start",
            }}
        >
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlignVertical: "bottom",
                    color: ThemeColors.Blue,
                }}
            >
                Reviews:
            </Text>
            <Rating
                ratingColor={ThemeColors.Red}
                ratingCount={5}
                startingValue={0}
                fractions={1}
                imageSize={18}
                // jumpValue={0.1}
                onFinishRating={(num) => setRating(num)}
                style={{ alignSelf: "baseline" }}
            ></Rating>
            <Text>Rating: {rating}/5</Text>

            <TextInput
                label="Comment"
                value={comment}
                multiline={true}
                onChangeText={(text) => setComment(text)}
                right={
                    <TextInput.Icon
                        icon={"send"}
                        onPress={() => sendComment()}
                    />
                }
            ></TextInput>
        </View>
    );
};

export default RatingInput;
