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
    setMinCapacity,
    setMaxCapacity,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { MultiStateButton, nextButtonState } from "./MultiStateButton";

const OfficeFilter = ({ visible, dismissHandler }) => {
    const sorting = useSelector(
        (state) => state.OfficeSearchOptions.sortByPrice
    );
    const minPrice = useSelector(
        (state) => state.OfficeSearchOptions.minimumPrice
    );
    const maxPrice = useSelector(
        (state) => state.OfficeSearchOptions.maximumPrice
    );
    const rating = useSelector(
        (state) => state.OfficeSearchOptions.minimumRating
    );
    const wifi = useSelector((state) => state.OfficeSearchOptions.wifi);
    const minCapacity = useSelector(
        (state) => state.OfficeSearchOptions.minimumCapacity
    );
    const maxCapacity = useSelector(
        (state) => state.OfficeSearchOptions.maximumCapacity
    );

    const [avaiablePriceRange, setPriceAvaiablity] = useState(true);
    const [avaiableCapacityRange, setCapacityAvaiablity] = useState(true);
    const [localRating, setLocalRating] = useState(rating);
    const dispatch = useDispatch();

    const wifiIconsFamily = [
        {
            state: null,
            icon: "wifi",
            color: ThemeColors.BlueGray,
        },
        {
            state: true,
            icon: "wifi",
            color: ThemeColors.Orange,
        },
        {
            state: false,
            icon: "wifi-off",
            color: ThemeColors.Blue,
        },
    ];

    const checkMinMaxPrice = () =>
        setPriceAvaiablity(
            minPrice === null || maxPrice === null || minPrice <= maxPrice
        );

    const checkMinMaxCapacity = () =>
        setCapacityAvaiablity(
            minCapacity === null ||
                maxCapacity === null ||
                minCapacity <= maxCapacity
        );

    useEffect(() => setLocalRating(rating), [rating]);

    useEffect(() => {
        checkMinMaxPrice();
    }, [minPrice, maxPrice]);

    useEffect(() => {
        checkMinMaxCapacity();
    }, [minCapacity, maxCapacity]);

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
                        <Divider style={styles.divider}></Divider>

                        <Text style={styles.subtitle}>
                            Price Range (PLN/Day)
                        </Text>
                        <View style={styles.inline}>
                            <TextInput
                                style={styles.input}
                                outlineColor={ThemeColors.Orange}
                                keyboardType="numeric"
                                mode="outlined"
                                label="min"
                                value={
                                    minPrice === null ? "" : String(minPrice)
                                }
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
                                value={
                                    maxPrice === null ? "" : String(maxPrice)
                                }
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
                        <Divider style={styles.divider}></Divider>

                        <Text style={styles.subtitle}>
                            Capacity Range (Person)
                        </Text>
                        <View style={styles.inline}>
                            <TextInput
                                style={styles.input}
                                outlineColor={ThemeColors.Orange}
                                keyboardType="numeric"
                                mode="outlined"
                                label="min"
                                value={
                                    minCapacity === null
                                        ? ""
                                        : String(minCapacity)
                                }
                                onChangeText={(value) => {
                                    dispatch(
                                        setMinCapacity(
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
                                value={
                                    maxCapacity === null
                                        ? ""
                                        : String(maxCapacity)
                                }
                                onChangeText={(value) => {
                                    dispatch(
                                        setMaxCapacity(
                                            value.replace(/[^0-9]/g, "")
                                        )
                                    );
                                }}
                            ></TextInput>
                        </View>
                        {avaiableCapacityRange ? (
                            <View></View>
                        ) : (
                            <Text style={{ color: ThemeColors.Red }}>
                                <Ionicons name="close-circle" />
                                Unavaiable capacity range.
                            </Text>
                        )}
                        <Divider style={styles.divider}></Divider>

                        <Text style={styles.subtitle}>Minimum Rating</Text>
                        <View style={styles.inline}>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                onValueChange={(value) => {
                                    setLocalRating(value);
                                }}
                                onSlidingComplete={(value) =>
                                    dispatch(
                                        setMinRating(Number(value.toFixed(1)))
                                    )
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
                        <Divider style={styles.divider}></Divider>

                        <Text style={styles.subtitle}>Wi-Fi</Text>
                        {/* <IconButton
                            icon="wifi-off"
                            iconColor={
                                wifi ? ThemeColors.Orange : ThemeColors.BlueGray
                            }
                            animated={true}
                            size={25}
                            selected={wifi}
                            onPress={() => dispatch(setWifiOption(!wifi))}
                        /> */}
                        <MultiStateButton
                            style={[styles.buttons, {marginLeft: 10}]}
                            icons={wifiIconsFamily}
                            state={wifi}
                            size={25}
                            onPress={() => {
                                dispatch(
                                    setWifiOption(
                                        nextButtonState(wifiIconsFamily, wifi)
                                    )
                                );
                            }}
                        ></MultiStateButton>
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
        height: 450,
        marginTop: 150,

        // : "center",
    },
    components: {
        flex: 1,
        flexDirection: "column",
        // alignItems: "baseline",
        justifyContent: "space-between",
        marginHorizontal: 20,
        width: 350,
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
    divider: {
        height: 1.5,
        backgroundColor: ThemeColors.BlueGray,
        marginVertical: 3,
    },
    inline: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "",
    },
    input: {
        height: 30,
        marginHorizontal: 10,
        backgroundColor: ThemeColors.White,
        marginBottom: 20
    },
});
export default OfficeFilter;
