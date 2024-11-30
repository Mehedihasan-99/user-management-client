import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email}
    // console.log( user )
    fetch("http://localhost:5000/users", {
      method: "POst",
      headers: {
        "Content-type" : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUsers = [...users, data];
      setUsers(newUsers);
      form.reset()
    })
  }

  return (
    <>
      <h1> Users Management Client</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>

      <p>Total Users : {users.length}</p>
      {
        users.map(user => <p key={user.id}>{user.id}: {user.name}: {user.email}</p>) 
      }
    </>
  )
}

export default App
