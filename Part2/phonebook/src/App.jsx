/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  }

  function onSearch(event) {
    setSearch(event.target.value);
  }

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
      <Filter search={search} onSearch={onSearch} />
      <Form
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        onAdd={onAdd}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
