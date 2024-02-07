import { TouchableOpacity, View, Text } from "react-native";
import { Card } from "react-native-paper";
import { useDispatch } from "react-redux";

const CarlyCard = ({ data , booking }) => {

    return (
        <TouchableOpacity onPress={() => booking(data.id)}>
            <Card>
                <Card.Content>
                    <Text>brand: {data.brand}</Text>
                    <Text>model: {data.model}</Text>
                    <Text>color: {data.color}</Text>
                    <Text>year: {data.year}</Text>
                    <Text>description: {data.description}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

export default CarlyCard;
