import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {globalStyles} from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import RecentExpenses from "./screens/RecentExpenses";
import {Ionicons} from "@expo/vector-icons";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from "react-native";
import ExpensesProvider from "./context/ExpensesContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpenseOverview() {
  return <Tab.Navigator screenOptions={({navigation}) => ({
    headerStyle: {backgroundColor: globalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: globalStyles.colors.primary500},
    tabBarActiveTintColor: globalStyles.colors.accent500,
    headerRight: ({tintColor}) => <IconButton icon='add' size={24} color={tintColor} onPress={() => {
      navigation.navigate("Manage Expense")
    }}/>
  })}>
    <Tab.Screen name='Recent Expenses' component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => <Ionicons name='hourglass' color={color} size={size}/>
    }
    }/>
    <Tab.Screen name='All Expenses' component={AllExpenses} options={{
      title: 'All Expenses',
      tabBarLabel: 'All Expenses',
      tabBarIcon: ({color, size}) => <Ionicons name='calendar' color={color} size={size}/>
    }
    }/>
  </Tab.Navigator>
}

export default function App() {
  return (<>
      <StatusBar style='auto'/>
      <ExpensesProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerStyle: {backgroundColor: globalStyles.colors.primary500}, headerTintColor: "white"}}>
            <Stack.Screen name='Expense Overview' component={ExpenseOverview} options={{
              headerShown: false,
            }}/>
            <Stack.Screen name='Manage Expense' component={ManageExpenses} options={({navigation}) => ({
              presentation: "modal",
              headerRight: ({tintColor}) => <IconButton
                icon='close'
                size={24}
                color={tintColor}
                onPress={() => navigation.goBack()}
              />
            })}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    </>
  );
}
