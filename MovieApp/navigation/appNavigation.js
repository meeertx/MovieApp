import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import RateScreen from "../screens/RateScreen";
import ContactScreen from "../screens/ContactScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen}/>
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen}/>
        <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen}/>
        <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen}/>
        <Stack.Screen name="Settings" options={{ headerShown: false }} component={SettingsScreen}/>
        <Stack.Screen name="About" options={{ headerShown:false }} component={AboutScreen}/>
        <Stack.Screen name="Rate" options={{ headerShown:false }} component={RateScreen}/>
        <Stack.Screen name="Contact" options={{ headerShown:false}} component={ContactScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}






