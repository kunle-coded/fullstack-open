import Person from "./Person";

function Persons({ filteredPersons, persons }) {
  return (
    <div>
      {filteredPersons.length >= 1
        ? filteredPersons.map((person) => (
            <Person key={person.name} person={person} />
          ))
        : persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  );
}

export default Persons;
