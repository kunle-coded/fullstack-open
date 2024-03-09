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
  const [isAdd, setIsAdd] = useState(false);
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

    personService
      .create(newPerson)
      .then((res) => {
        if (res.data.message === "Person already exists in phonebook") {
          const id = res.data.person.id;
          setIsAdd(false);
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            personService.update(id, newPerson).then((res) => {
              setPersons(persons.concat(res));
              setMessage(`Changed ${newPerson.name}'s number`);
              setNotificationClass("success");
              setNewName("");
              setNewNumber("");
            });
          }
        } else {
          setPersons(persons.concat(res));
          setMessage(`Added ${newPerson.name}`);
          setNotificationClass("success");
          setNewName("");
          setNewNumber("");
        }
      })
      .catch((error) => {
        setIsAdd(false);
        setMessage(error.response.data.error);
        setNotificationClass("error");
      });

    setIsAdd(true);

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
    }
    setIsDelete(false);
  }

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, [isDelete]);

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, [isAdd]);

  useEffect(() => {
    const filtered = persons.filter((person) => {
      person?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });
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
