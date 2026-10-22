import { useState } from "react";

const EMPTY = {
  title: "",
  author: "",
  pages: "",
  format: "paperback",
  dateStarted: "",
  notes: "",
  finished: false,
  rating: 3,
};

const validate = (values) => {
  const errors = {};

  if (!values.title.trim()) {
    errors.title = "A book needs a title";
  }

  if (!values.author.trim()) {
    errors.author = "who wrote it?";
  }

  if ((values.pages != "" && Number(values.pages), 1)) {
    errors.pages = "pages has to be at least 1";
  }

  if (values.finished && !values.dateStarted) {
    errors.dateStarted = "If you finish it, when did you start?";
  }

  return errors;
};

const BookForm = (props) => {
  const { onAdd } = props;
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});

  const errors = validate(values);

  //A message only shows once the user has LEFT. that field. Telling someone
  //"a book needs a title" while they are typing the T us just rude
  const showError = (field) => {
    return touched[field] ? errors[field] : undefined;
  };

  //ONE handler for every text field. `event.target.name` is the input
  //name attribute, and [name] is a computed property -- it uses the VALUE name as the key
  //so one function updates whichever field that changed
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    console.log(typeof value);
    setValues({
      ...values,
      // A checkbox's `value` is not what you want -- it is whetever string
      //sits in the value attribute, wheather or not the box is ticked. The tick lives in `checked`.
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(values);

    //On submit, everything counts as touched --- otherwise a field they never visited fails silently,
    setTouched({ title: true, author: true, pages: true, dateStarted: true });

    if (Object.keys(errors).length > 0) {
      return;
    }
    // Cast on the way OUT in one place. Numbers stored as strings are the reason
    //SORT puts "10" before "9"
    onAdd({
      ...values,
      pages: Number(values.pages) || 0,
      rating: Number(values.rating),
    });

    //setting state back to EMPTY clears every field, because every field is reading is value from state
    setValues(EMPTY);
    setTouched({});
  };

  const fieldClass = (field) => {
    const base = "mt-1 w-full rounded border px-3 py-2";
    return showError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border-gray-300`;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="block text-sm font-medium" htmlFor="title">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          // required
          maxLength="120"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          // className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          onBlur={handleBlur}
          aria-invalid={showError("title") ? true : undefined}
          aria-describedby={showError("title") ? "title-error" : undefined}
          className={fieldClass("title")}
        />
        {showError("title") && (
          <p id="title-error" className="mt-1 text-sm text-red-700">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="author">
          Author<span className="text-red-600">*</span>
        </label>
        <input
          required
          id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="pages">
          Pages
        </label>
        <input
          type="number"
          id="pages"
          name="pages"
          min="1"
          max="5000"
          value={values.pages}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="format">
          Format
        </label>
        {/* a select is controll exactly like a text input value + exchange 
        goes ON THE SELECT not the individual options */}
        <select
          id="format"
          name="format"
          value={values.format}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="paperback">Paperback</option>
          <option value="hardcover">Hardcover</option>
          <option value="ebook">Ebook</option>
          <option value="audio">Audiobook</option>
        </select>
      </div>

      {/* checked, nnot value. And the label wraps the input, so the words are clickable too */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            id="pages"
            name="finished"
            value={values.finished}
            onChange={handleChange}
            className="h-4 w-4"
          />
          Finished it
        </label>
      </div>

      {/* a range is a text input in a trench coat: value and onChange, and the value arrives as a string */}
      <div>
        <label className="block text-sm font-medium" htmlFor="rating">
          Rating: {values.rating}/5
        </label>
        <input
          id="rating"
          name="rating"
          type="range"
          mion="1"
          max="5"
          value={values.rating}
          onChange={handleChange}
          className="mt-1 w-full"
        />
      </div>

      {/* type=date gives you a string shaped YYYY-MM-DD. Nothing else will load into it, so store it exactly as it comes. */}
      <div>
        <label className="block text-sm font-medium" htmlFor="dateStarted">
          Started
        </label>
        <input
          type="date"
          id="dateStarted"
          name="dateStarted"
          value={values.dateStarted}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      {/* a textarea in JSX is controled with value, NOT with children */}
      <div>
        <label className="block text-sm font-medium" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          maxLength="200"
          value={values.notes}
          onChange={handleChange}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
        />
        <p className="mt-1 text-xs text-gray-500">{values.notes.length}/200</p>
      </div>

      <button className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700">
        Add book
      </button>
    </form>
  );
};

export default BookForm;
