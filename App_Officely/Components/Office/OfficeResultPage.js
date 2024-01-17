import { FlatList, View, StyleSheet } from "react-native";
import SearchInfoTool from "../Utils/SearchInfoTool";
import OfficeCard from "./OfficeCard";
import { ThemeColors } from "../Utils/color";

const officeData = [
    {
        office_id: "123e4567-e89b-12d3-a456-426614174001",
        Name: "TechHub Workspace",
        Address: "123 Main Street",
        facilities: "Meeting rooms, coworking spaces",
        Contact: "contact@techhub.com",
        Rating: 4.5,
        Price: 150.0,
        wifi: true,
        City: "San Francisco",
        PictureUri: "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        office_id: "456e7890-12ab-34cd-56ef-789012345678",
        Name: "Innovate Office Suites",
        Address: "456 Oak Avenue",
        facilities: "Private offices, event spaces",
        Contact: "info@innovateoffices.com",
        Rating: 4.2,
        Price: 200.0,
        wifi: true,
        City: "New York",
        PictureUri: "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },{
        office_id: "456e7890-12ab-34cd-56ef-789012345678",
        Name: "Innovate Office Suites",
        Address: "456 Oak Avenue",
        facilities: "Private offices, event spaces",
        Contact: "info@innovateoffices.com",
        Rating: 4.2,
        Price: 200.0,
        wifi: true,
        City: "New York",
        PictureUri: "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },{
        office_id: "456e7890-12ab-34cd-56ef-789012345678",
        Name: "Innovate Office Suites",
        Address: "456 Oak Avenue",
        facilities: "Private offices, event spaces",
        Contact: "info@innovateoffices.com",
        Rating: 4.2,
        Price: 200.0,
        wifi: true,
        City: "New York",
        PictureUri: "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },{
        office_id: "456e7890-12ab-34cd-56ef-789012345678",
        Name: "Innovate Office Suites",
        Address: "456 Oak Avenue",
        facilities: "Private offices, event spaces",
        Contact: "info@innovateoffices.com",
        Rating: 4.2,
        Price: 200.0,
        wifi: true,
        City: "New York",
        PictureUri: "https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more office entries as needed
];

const OfficeResultPage = ({ navigation }) => {
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

export default OfficeResultPage;
