import Person from "./Person";

function Persons({ filteredPersons, persons, onDelete }) {
  return (
    <div>
      {filteredPersons.length >= 1
        ? filteredPersons.map((person) => (
            <Person key={person.name} person={person} onDelete={onDelete} />
          ))
        : persons.map((person) => (
            <Person key={person.name} person={person} onDelete={onDelete} />
          ))}
    </div>
  );
}

export default Persons;
