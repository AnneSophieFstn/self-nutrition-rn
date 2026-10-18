import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Planning";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}