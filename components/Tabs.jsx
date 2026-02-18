import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

export default function Tabs () {
    return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name='Search' component={SearchScreen}/>
        <Tab.Screen name="Library" component={LibraryScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
    )
}