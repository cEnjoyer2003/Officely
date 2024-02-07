import { TouchableOpacity, View, Text } from "react-native";
import { Card, Icon } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ThemeColors } from "../Utils/Colors";

const CarlyBookCard = ({ data }) => {
    return (
        <TouchableOpacity>
            <Card style={{ backgroundColor: ThemeColors.PureWhite }}>
                <Card.Content>
                    <Icon
                        source="car"
                        size={40}
                        color={ThemeColors.Orange}
                    ></Icon>
                    <Text>startDate: {data.startDate}</Text>
                    <Text>endDate: {data.endDate}</Text>
                    <Text>createdAt: {data.createdAt}</Text>
                    <Text>carId: {data.carId}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

export default CarlyBookCard;
