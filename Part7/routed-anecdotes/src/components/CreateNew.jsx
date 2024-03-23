import { useField } from "../hooks";

function CreateNew(props) {
  const content = useField("text");
  const { reset: resetField, ...contentProps } = content;
  const author = useField("text");
  const { reset: resetAuthor, ...authorProps } = author;
  const info = useField("text");
  const { reset: resetInfo, ...infoProps } = info;
  const reset = useField("button");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button onClick={handleSubmit}>create</button>
        <button onClick={() => reset.onReset}>reset</button>
      </form>
    </div>
  );
}

export default CreateNew;
