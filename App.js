import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

const TaskItem = ({ item, darkMode, toggleComplete, deleteTask }) => (
  <View style={darkMode ? styles.darkTask : styles.task}>
    <Text style={[styles.taskText, item.completed && styles.completedText]}>
      {item.title} (Due: {item.dueDate})
    </Text>
    <TouchableOpacity onPress={() => toggleComplete(item.id)}>
      <Text style={darkMode ? styles.darkButtonText : styles.buttonText}>
        {item.completed ? "Undo" : "Complete"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => deleteTask(item.id)}>
      <Text style={darkMode ? styles.darkButtonText : styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const HomeworkPlanner = () => {
  const [tasks, setTasks] = useState(initialAssignment);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [Assignments, setAssignments] = useState(initialAssignment);

  const addTask = () => {
    if (!title.trim() || !dueDate.trim()) {
      showAlert("Error", "Please fill in both the title and due date.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dueDate)) {
      showAlert("Error", "Please enter the due date in the format YYYY-MM-DD.");
      return;
    }

    const isDuplicate = tasks.some((task) => task.title === title && task.dueDate === dueDate);
    if (isDuplicate) {
      showAlert("Error", "This task already exists.");
      return;
    }

    const newAssignment = {
      id: (Assignments.length + 1).toString(),
      title: title.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks([...tasks, { ...newAssignment }]);
    setAssignments([...Assignments, newAssignment]);
    setTitle("");
    setDueDate("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkTitle]}>Homework Planner</Text>
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Assignment Title"
        placeholderTextColor={darkMode ? "#aaa" : "#000"}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Due Date (YYYY-MM-DD)"
        placeholderTextColor={darkMode ? "#aaa" : "#000"}
        value={dueDate}
        onChangeText={setDueDate}
      />
  
      <View style={styles.buttonContainer}>
        <Button
          title="Add Task"
          onPress={addTask}
          accessibilityLabel="Add Task"
          accessibilityHint="Add a new task to the list"
        />
        
        <Button
          title={darkMode ? "Light Mode" : "Dark Mode"}
          onPress={() => setDarkMode(!darkMode)}
          accessibilityLabel="Toggle dark mode"
          accessibilityHint="Switch between light and dark mode"
        />
      </View>
  
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            darkMode={darkMode}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        )}
      />
    </View>
  );
} 

const initialAssignment = [
  {
    id: "1",
    title: "Math Homework",
    dueDate: "2025-10-15",
    completed: false,
  },
  {
    id: "2",
    title: "Science Project",
    dueDate: "2025-10-20",
    completed: false,
  },
  {
    id: "3",
    title: "History Essay",
    dueDate: "2025-10-25",
    completed: false,
  },
]

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 50,
    backgroundColor: "#28EAE2",
    justifyContent: "center",
  },
  darkContainer: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#1A1A2E",
  },
  title: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#FF6F61", 
    textAlign: "center",
  },
  darkTitle: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "skyblue", 
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: "green",
    backgroundColor: "#FFF5EE",
    color: "#000",
    textAlign: "center",
    borderRadius: 10,
  },
  darkInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: "green",
    backgroundColor: "#2E2E3A",
    color: "#fff",
    textAlign: "center",
    borderRadius: 10,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "green",
    backgroundColor: "#FFF5EE",
    borderRadius: 10,
    marginBottom: 5,
  },
  darkTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "green",
    backgroundColor: "#2E2E3A",
    borderRadius: 10,
    marginBottom: 5,
  },
  taskText: { 
    fontSize: 12, 
    color: "skyblue" 
  },
  completedText: { 
    textDecorationLine: "line-through", 
    color: "#6A0572",
  },
  buttonText: { 
    color: "#0A50F9",
    fontWeight: "bold", 
    marginLeft: "auto",
    marginRight: "auto",
  },
  darkButtonText: { 
    color: "#0A50F9",
    fontWeight: "bold",
    marginLeft: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    borderRadius: 50,
    padding: 10,
    borderColor: "#FF6F61",
  },
});

export default HomeworkPlanner;
