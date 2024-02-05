import { FlatList, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import HeaderBar from "../Utils/HeaderBar";
import SearchInfoTool from "../Utils/SearchInfoTool";
import OfficeCard from "./OfficeCard";
import { ThemeColors } from "../Utils/Colors";
import OfficeFilter from "../Utils/OfficeFilter";
import { searchOffice } from "../../redux/thunk";

const OfficeResultScreen = ({ navigation }) => {
    const officeData = useSelector((state) => state.OfficeData);
    const dispatch = useDispatch();

    const [filterVisible, setFilterVisibility] = useState(false);

    const callFilter = () => {
        setFilterVisibility(true);
    };

    const dismissFilter = () => {
        dispatch(searchOffice());
        setFilterVisibility(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderBar
                title="Officely Results"
                back={() => navigation.popToTop()}
            />
            <OfficeFilter
                visible={filterVisible}
                dismissHandler={dismissFilter}
            ></OfficeFilter>
            <SearchInfoTool filterHandler={callFilter}></SearchInfoTool>
            <View style={styles.container}>
                <FlatList
                    data={officeData}
                    renderItem={({ item }) => (
                        <OfficeCard
                            data={item}
                            navigation={navigation}
                        ></OfficeCard>
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
        flex: 1,
        // backgroundColor: ThemeColors.White,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
});

export default OfficeResultScreen;
