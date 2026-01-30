import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

// Import dashboards
import StudentDashboard from './src/screens/StudentDashboard';
import StaffDashboard from './src/screens/StaffDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  // For demo purposes: simple login (by role + ID/name for students)
  const [userRole, setUserRole] = useState(null); // 'student' or 'staff'
  const [loggedStudent, setLoggedStudent] = useState(null);

  const resetLogin = () => { setUserRole(null); setLoggedStudent(null); };

  if (!userRole) {
    // Show role selection
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Prospectus System</Text>
        <Button title="Login as Student" onPress={() => setUserRole('student')} />
        <View style={{ height: 10 }} />
        <Button title="Login as Staff" onPress={() => setUserRole('staff')} />
      </View>
    );
  }

  // Student login by ID/Name
  if (userRole === 'student' && !loggedStudent) {
    const StudentLogin = require('./src/components/StudentLogin').default;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <StudentLogin onLogin={(s) => setLoggedStudent(s)} onBack={() => setUserRole(null)} />
      </View>
    );
  }

  // Once logged in, navigate to the appropriate dashboard
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={userRole === 'student' ? 'StudentDashboard' : 'StaffDashboard'}>
        <Stack.Screen
          name="StudentDashboard"
          options={{ title: 'Student Dashboard', headerRight: () => (
            <Button title="Logout" onPress={() => resetLogin()} />
          ) }}
        >
          {(props) => loggedStudent ? (
            <StudentDashboard {...props} studentName={loggedStudent.name} gpa={loggedStudent.gpa} grades={loggedStudent.grades} student={loggedStudent} />
          ) : (
            <StudentDashboard {...props} studentName="Guest" gpa={null} grades={[]} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="StaffDashboard"
          options={{ title: 'Staff Dashboard', headerRight: () => (
            <Button title="Logout" onPress={() => resetLogin()} />
          ) }}
        >
          {(props) => <StaffDashboard {...props} staffName="Ms. Smith" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
