import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import {
    Button,
    Modal,
    SegmentedButtons,
    Portal,
    TextInput,
    IconButton,
    Divider,
    Card,
} from "react-native-paper";
import Slider from "@react-native-community/slider";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemeColors } from "./Colors";
import {
    setMinPrice,
    setMaxPrice,
    setMinRating,
    setSortByPrice,
    setWifiOption,
} from "../../redux/actions";
import { Input } from "@rneui/base";
import { useEffect, useState } from "react";

const OfficeFilter = ({ visible, dismissHandler }) => {
    const sorting = useSelector(
        (state) => state.OfficeSearchOptions.SortByPrice
    );
    const minPrice = useSelector((state) => state.OfficeSearchOptions.MinPrice);
    const maxPrice = useSelector((state) => state.OfficeSearchOptions.MaxPrice);
    const rating = useSelector((state) => state.OfficeSearchOptions.MinRating);
    const wifi = useSelector((state) => state.OfficeSearchOptions.Wifi);
    useEffect(() => setLocalRating(rating), []);

    const dispatch = useDispatch();

    const [avaiablePriceRange, setAvaiablity] = useState(true);
    const [localRating, setLocalRating] = useState(rating);
    const checkMinMaxPrice = () =>
        setAvaiablity(
            minPrice <= maxPrice || isNaN(minPrice) || isNaN(maxPrice)
        );

    useEffect(() => {
        checkMinMaxPrice();
    }, [minPrice, maxPrice]);

    return (
        <Portal>
            <Modal
                style={styles.container}
                visible={visible}
                onDismiss={dismissHandler}
            >
                <Card style={styles.components}>
                    <Card.Content>
                        <Text style={styles.subtitle}>Sort by Price </Text>
                        <SegmentedButtons
                            style={styles.buttons}
                            value={sorting}
                            onValueChange={(value) => {
                                dispatch(setSortByPrice(value));
                                // console.log(sorting);
                            }}
                            backgroundColor={ThemeColors.Orange}
                            buttons={[
                                {
                                    value: null,
                                    icon: "sort",
                                    checkedColor: ThemeColors.PureWhite,
                                },
                                {
                                    value: "asc",
                                    icon: "sort-ascending",
                                    label: "Low",
                                    checkedColor: ThemeColors.PureWhite,
                                },
                                {
                                    value: "desc",
                                    icon: "sort-descending",
                                    label: "High",
                                    checkedColor: ThemeColors.PureWhite,
                                },
                            ]}
                        />
                        <Text style={styles.subtitle}>Price Range</Text>

                        <View style={styles.inline}>
                            <TextInput
                                style={styles.input}
                                outlineColor={ThemeColors.Orange}
                                keyboardType="numeric"
                                mode="outlined"
                                label="min"
                                value={isNaN(minPrice) ? "" : String(minPrice)}
                                onChangeText={(value) => {
                                    dispatch(
                                        setMinPrice(
                                            value.replace(/[^0-9]/g, "")
                                        )
                                    );
                                }}
                            ></TextInput>
                            <Text style={styles.subtitle}>~</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                outlineColor={ThemeColors.Orange}
                                mode="outlined"
                                label="max"
                                value={isNaN(maxPrice) ? "" : String(maxPrice)}
                                onChangeText={(value) => {
                                    dispatch(
                                        setMaxPrice(
                                            value.replace(/[^0-9]/g, "")
                                        )
                                    );
                                }}
                            ></TextInput>
                        </View>
                        {avaiablePriceRange ? (
                            <View></View>
                        ) : (
                            <Text style={{ color: ThemeColors.Red }}>
                                <Ionicons name="close-circle" />
                                Unavaiable price range.
                            </Text>
                        )}
                        <Text style={styles.subtitle}>Minimum Rating : </Text>
                        <View style={styles.inline}>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                onValueChange={(value) => {
                                    setLocalRating(value);
                                }}
                                onSlidingComplete={(value) =>
                                    dispatch(setMinRating(value))
                                }
                                value={rating}
                                minimumValue={0}
                                maximumValue={5}
                                step={0.1}
                                minimumTrackTintColor={ThemeColors.Orange}
                                maximumTrackTintColor={ThemeColors.LightBlue}
                                thumbTintColor={ThemeColors.Orange}
                            />
                            <Text style={styles.subtitle}>
                                {localRating.toFixed(1)}
                            </Text>
                        </View>
                        <Text style={styles.subtitle}>Facility</Text>
                        <IconButton
                            icon="wifi"
                            iconColor={
                                wifi ? ThemeColors.Orange : ThemeColors.BlueGray
                            }
                            animated={true}
                            size={25}
                            selected={wifi}
                            onPress={() => dispatch(setWifiOption(!wifi))}
                        />
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        // backgroundColor: ThemeColors.PureWhite,
        // padding: 20,
        height: 500,

        // : "center",
    },
    components: {
        flex: 1,
        flexDirection: "column",
        alignItems: "baseline",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 150,
        height: 500,
        width: 300,
        backgroundColor: ThemeColors.PureWhite,
        // marginTop: 50,
        // marginBottom: 50,
        // marginHorizontal: 20,
    },
    subtitle: {
        fontSize: 18,
    },
    buttons: {
        marginVertical: 10,
    },
    inline: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        height: 30,
        marginHorizontal: 10,
        backgroundColor: ThemeColors.PureWhite,
    },
});
export default OfficeFilter;
