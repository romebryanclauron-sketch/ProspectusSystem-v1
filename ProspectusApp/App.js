import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

// Import dashboards
import StudentDashboard from './src/screens/StudentDashboard';
import StaffDashboard from './src/screens/StaffDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  // For demo purposes: simple login simulation
  const [userRole, setUserRole] = useState(null); // 'student' or 'staff'

  if (!userRole) {
    // Show simple login screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Prospectus System</Text>
        <Button title="Login as Student" onPress={() => setUserRole('student')} />
        <View style={{ height: 10 }} />
        <Button title="Login as Staff" onPress={() => setUserRole('staff')} />
      </View>
    );
  }

  // Once logged in, navigate to the appropriate dashboard
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userRole === 'student' ? 'StudentDashboard' : 'StaffDashboard'}>
        <Stack.Screen
          name="StudentDashboard"
          options={{ title: 'Student Dashboard' }}
        >
          {(props) => <StudentDashboard {...props} studentName="John Doe" gpa={3.7} grades={[
            { courseCode: 'MATH101', courseName: 'Calculus I', grade: 'A' },
            { courseCode: 'ENG102', courseName: 'English', grade: 'B+' }
          ]} />}
        </Stack.Screen>

        <Stack.Screen
          name="StaffDashboard"
          options={{ title: 'Staff Dashboard' }}
        >
          {(props) => <StaffDashboard {...props} staffName="Ms. Smith" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
  )
  ;
}
