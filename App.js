import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

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
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);

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

    setTasks([...tasks, { id: Date.now().toString(), title, dueDate, completed: false }]);
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#D5F1DF",
    justifyContent: "center",
  },
  darkContainer: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#1A1A2E",
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#FF6F61", 
    textAlign: "center",
  },
  darkTitle: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#F9ED69", 
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: "#FFB6C1",
    backgroundColor: "#FFF5EE",
    color: "#000",
    textAlign: "center",
    borderRadius: 10,
  },
  darkInput: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: "#6A0572",
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
    borderColor: "#FF6F61",
    backgroundColor: "#FFF5EE",
    borderRadius: 10,
    marginBottom: 5,
  },
  darkTask: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#6A0572",
    backgroundColor: "#2E2E3A",
    borderRadius: 10,
    marginBottom: 5,
  },
  taskText: { 
    fontSize: 16, 
    color: "#FF6F61" 
  },
  completedText: { 
    textDecorationLine: "line-through", 
    color: "#6A0572",
  },
  buttonText: { 
    color: "#0A50F9",
    fontWeight: "bold", 
    marginLeft: 2,
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
