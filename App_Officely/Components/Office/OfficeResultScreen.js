import { FlatList, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import SearchInfoTool from "../Utils/SearchInfoTool";
import OfficeCard from "./OfficeCard";
import { ThemeColors } from "../Utils/Colors";

const officeData = [
];

const OfficeResultScreen = ({ navigation }) => {

    const officeData = useSelector((state) => state.OfficeData);
    // TODO: navigation BACK to the search page, not former page.
    return (
        <View style={{flex : 1}}>
            <SearchInfoTool></SearchInfoTool>
            <View style={styles.container}>
                <FlatList
                    data={officeData}
                    renderItem={({ item }) => (
                        <OfficeCard data={item} navigation={navigation}></OfficeCard>
                    )}
                    // refreshControl={
                    //     <RefreshControl
                    //         refreshing={refreshing}
                    //         onRefresh={onRefresh}
                    //         colors={["#009688"]}
                    //     />
                    // }
                ></FlatList>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex : 1,
        // backgroundColor: ThemeColors.White,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,

    }
});

export default OfficeResultScreen;
