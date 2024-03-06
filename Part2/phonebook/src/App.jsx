/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [message, setMessage] = useState(null);
  const [notificationClass, setNotificationClass] = useState("");

  function handleName(event) {
    setNewName(event.target.value);
  }

  function handleNumber(event) {
    setNewNumber(event.target.value);
  }

  function onAdd(e) {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const alreadyExist = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (alreadyExist) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatePers = { ...alreadyExist, number: newPerson.number };
        personService
          .update(alreadyExist.id, updatePers)
          .then((res) => {
            setMessage(`Changed ${newPerson.name}'s number`);
            setNotificationClass("success");
          })
          .catch((error) => {
            if (error.response?.request?.status === 404) {
              setMessage(
                `Information of ${newPerson.name} has already been removed from server`
              );
              setNotificationClass("error");
            }
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(newPerson));

      personService
        .create(newPerson)
        .then((res) => setPersons(persons.concat(res)));

      setNewName("");
      setNewNumber("");

      setMessage(`Added ${newPerson.name}`);
      setNotificationClass("success");
    }

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  function onSearch(event) {
    setSearch(event.target.value);
  }

  function handleDelete(person) {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.deletePerson(person.id).then((res) => setIsDelete(true));
    } else {
      setIsDelete(false);
      return;
    }
  }

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, [isDelete]);

  useEffect(() => {
    const filtered = persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilteredPersons([...filtered]);

    if (search === "") {
      setFilteredPersons([]);
    }
  }, [persons, search]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className={notificationClass} />
      <Filter search={search} onSearch={onSearch} />
      <Form
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        onAdd={onAdd}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filteredPersons={filteredPersons}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
