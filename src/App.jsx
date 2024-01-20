import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react";

function App() {
  const [contactList, setContactList] = useState(contacts.slice(7, 12));

  const addContact = () => {
    if (contactList.length === contacts.length) {
      return;
    }

    const random = Math.floor(Math.random() * contacts.length);
    const randomContact = contacts[random];

    if (contactList.includes(randomContact)) {
      addContact();
    } else {
      setContactList([randomContact, ...contactList]);
    }
  };

  const sortName = () => {
    const combinedArray = [...contactList];
    combinedArray.sort((name1, name2) => name1.name.localeCompare(name2.name));
    setContactList(combinedArray)
  };

  const sortPopularity = () => {
    const combinedArray = [...contactList];
    combinedArray.sort((name1, name2) => name1.popularity > name2.popularity ? -1 : 1);
    setContactList(combinedArray)
  };

  const deleteContact = (item) => {
    const combinedArray = [ ...contactList];
    combinedArray.splice(item, 1);
    setContactList(combinedArray);
  }

  return (
    <div className="App">
      <h1>IronContact</h1>
      <button className="button-add" onClick={addContact}>Add Random Contact</button>
      <br></br>
      <button className="button-sort" onClick={sortName} >Sort by Name</button>
      <button className="button-sort" onClick={sortPopularity} >Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th> Picture </th>
            <th> Name </th>
            <th> Popularity </th>
            <th> Won Oscar </th>
            <th> Won Emmy </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((actor) => {
            return (
              <tr key={actor.id}>
                <td>
                  <img src={actor.pictureUrl} width="40px" />
                </td>
                <td>
                  <p> {actor.name} </p>
                </td>
                <td>
                  <p> {actor.popularity.toFixed(2)} </p>
                </td>
                <td>{actor.wonOscar ? "🏆" : ""}</td>
                <td>{actor.wonEmmy ? "🌟" : ""}</td>
                <td>
                  <button className="delete-button" onClick={ () => deleteContact(contactList.indexOf(actor)) } >Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
