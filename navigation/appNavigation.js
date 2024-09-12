import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import TopratedScreen from '../screens/TopratedScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserScreen from '../screens/UserScreen';
import MoviesFavScreen from '../screens/MoviesFavScreen';
import PersonFavScreen from '../screens/PersonFavScreen';
import SettingScreen from '../screens/SettingScreen';
import SplashScreen from '../screens/Splash';
import ForgotScreen from '../screens/ForgotScreen';
import ManageScreen from '../screens/ManageScreen';
import AboutScreen from '../screens/AboutScreen';
import { ThemeProvider } from '../screens/ThemeContext'; // Path to your ThemeContext
import MovieRecommendationScreen from '../screens/RandomMoviesScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <ThemeProvider>
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
            <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />

                <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                <Stack.Screen name="Forgot"  component={ForgotScreen} />

                <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
                <Stack.Screen name="Recom" options={{ headerShown: false }} component={MovieRecommendationScreen} />

                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
                <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
                <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />

                <Stack.Screen
                    name="User"
                    component={UserScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />

                <Stack.Screen
                    name="About"
                    component={AboutScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />

                <Stack.Screen
                    name="Manage"
                    component={ManageScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />

                <Stack.Screen
                    name="PersonFav"
                    component={PersonFavScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />

                <Stack.Screen
                    name="MovieFav"
                    component={MoviesFavScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />

                <Stack.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />

                <Stack.Screen
                    name="Upcoming"
                    component={UpcomingScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', 
                        },
                        headerTintColor: 'white', 
                        headerTitleStyle: {
                            fontWeight: 'bold', 
                        },
                    }}
                />
                <Stack.Screen
                    name="Top Rated"
                    component={TopratedScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: '#eab308', // Background color of the header
                        },
                        headerTintColor: 'white', // Color of the header text and icons
                        headerTitleStyle: {
                            fontWeight: 'bold', // Style of the header title
                        },
                    }}
                />
                

            </Stack.Navigator>
        </NavigationContainer>
        </ThemeProvider>

    );
}
