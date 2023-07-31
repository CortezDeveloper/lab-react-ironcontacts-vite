import "./App.css";
import React from "react";
import JSONcontacts from "./contacts.json"
import { useState } from "react";

const fiveContacts = JSONcontacts.slice(0,5)
console.log(fiveContacts)

function App() {
  const [contacts, setContacts] = useState(fiveContacts)

  return (
    <div className="App">
      <h1 style={{color: "red"}}>LAB | React IronContacts</h1>
      <button onClick={handleAdd}>Add Random Contact</button>
      <button onClick={handleSortName}>Sort by name</button>
      <button onClick={handleSortPop}>Sort by popularity</button>
    
  

      <table>
        <thead>
          <tr>
           <th>Picture</th>
           <th>Name</th>
           <th>Popularity</th>
           <th>Won Oscar</th>
           <th>Won Emmy </th>
          </tr>
         </thead>
         <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt="Contact Picture" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar ? "🏆": " "}</td>
                <td>{contact.wonEmmy ? "🏆":" "}</td>
                <td>
                  <button onClick={() => handleRemove(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr> 
            )
          })}
         </tbody>
      </table>
    </div>
  );

  function handleAdd(){
    if(contacts.length === JSONcontacts.length) {
      return console.log("Added everyone")
    }

    const idExtra = contacts.map((contact) => contact.id)
    console.log(idExtra)
    const filteredContacts = JSONcontacts.filter((contact) => {
      if(idExtra.includes(contact.id)) {
        return false
      }
      return true
    })

    console.log("filteredContacts", filteredContacts)
    const randomIndex = Math.floor(Math.random() *filteredContacts.length)
    const randomContact = filteredContacts[randomIndex]
    const newState = [...contacts, randomContact]
    setContacts(newState)
  }

  function handleSortName () {
    const copy = [...contacts]
    copy.sort((a,b) => a.name.localeCompare(b.name))
    setContacts(copy)
  }

  function handleSortPop () {
    const copy = [...contacts]
    copy.sort((a,b) => {
      return b.popularity - a.popularity
    })
    setContacts(copy)
  }

  function handleRemove(idRemove) {
    const filteredContact = contacts.filter((contact) => {
      if (contact.id === idRemove) {
        return false 
      } else {
        return true
      }
    })
    setContacts(filteredContact)
  }

}

export default App;
