import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Planning from '../screens/Planning';
import MealPlanner from '../screens/MealPlanner';
import Courses from '../screens/Courses';
import Aliments from '../screens/Aliments';
import Stock from '../screens/Stock';
import Ionicons from '@react-native-vector-icons/ionicons';



const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator 
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Planning') {
            iconName = focused
              ? 'calendar-sharp'
              : 'calendar-outline';
          } else if (route.name === 'Meal prep') {
            iconName = focused ? 'journal' : 'journal-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Aliments') {
            iconName = focused ? 'nutrition' : 'nutrition-outline';
          } else if (route.name === 'Stock') {
            iconName = focused ? 'bag-handle' : 'bag-handle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Planning" component={Planning} options={{ headerShown: false }}/>
      <Tab.Screen name="Meal prep" component={MealPlanner} options={{ headerShown: false }}/>
      <Tab.Screen name="Courses" component={Courses} options={{ headerShown: false }}/>
      <Tab.Screen name="Aliments" component={Aliments} options={{ headerShown: false }}/>
      <Tab.Screen name="Stock" component={Stock} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}