import React from "react";
import { useState, useEffect} from "react";
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/addTask"
import Task from "./components/Task";
import Footer from "./components/Footer";

function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks,setTasks]=useState([])
  useEffect(()=>{
    const getTasks=async()=>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

//fetch tasks
const fetchTasks = async()=>{
      const res = await fetch("http://localhost:5000/tasks")
      const data = await res.json()
      return data
    }

//fetch tasks
const fetchTask = async(id)=>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }


//add task
const addTask = async(task)=>{
  const res = await fetch('http://localhost:5000/tasks',
  {
    method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  })
  const data= await res.json()
  setTasks([...tasks,data])
//const id=Math.floor(Math.random()*10000)+1
  //const newTask={id,...task}
  //setTasks([...tasks, newTask])
}

//delete task
const deleteTask = async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'DELETE'
  })
  setTasks(tasks.filter((task)=>task.id!==id))
}

//toggle reminder
const toggleReminder = async(id)=>{
  const taskToToggle = await fetchTask(id)
  const updTask = {...taskToToggle,reminder:!taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task)=>(task.id == id ? {...task, reminder:data.reminder}:task)))
}

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)}title="Task Tracker"/>
      {showAddTask ? <AddTask onAdd={addTask}/>:""}
      {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'It is all chill here \\{^_^}/'}
      <Footer/>
    </div>
  );
}

export default App;
