import { useReducer } from "react";
import { produce } from "immer";
//Action types as constants. A misspelled STRING fails silently; a misspelled
//VARIABLE NAME throws an error that points at the line. ALL_CAPS is the
//convention -- it tells another developer "this is an action type"
const INCREMENT_COUNT = "increment-count";
const DECREMENT_COUNT = "decrement-count";
const SET_VALUE_TO_ADD = "set-value-to-add";
const ADD_VALUE_TO_COUNT = "add-value-to-count";

//useReducer is a plain function, it takes the current state and action
//and RETURNS THE ENXT STATE it is not allowed to change the state it was given
//we always build and return a new object
const reducer = (state, action) => {
  ///action.type says why the reduce is running
  // if (action.type === INCREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count + 1,
  //   };
  // switch (action.type) {
  //   case INCREMENT_COUNT:
  //     return {
  //       ...state,
  //       count: state.count + 1,
  //     };
  //   case DECREMENT_COUNT:
  //     return {
  //       ...state,
  //       count: state.count - 1,
  //     };
  //   case SET_VALUE_TO_ADD:
  //     return {
  //       ...state,
  //       valueToAdd: action.payload,
  //     };
  //   case ADD_VALUE_TO_COUNT:
  //     return {
  //       ...state,
  //       count: state.count + state.valeToAdd,
  //       valueToAdd: 0,
  //     };
  //   //every switch needs a default, and ours returns the state untouched
  //   default:
  //     return state;
  // }
  //REFACTOR: use immer produce
  // (don't forget to wrap your reducer function in your useReducer hook)
  // with immer we can directly mutate state, we don't have to worry about fields we didn't touch
  // aka we don't have to return the entire state object anymore, we just mutate state directly and immer
  // does the worrying for us
  switch (action.type) {
    case INCREMENT_COUNT:
      state.count = state.count + 1;
      return;

    case DECREMENT_COUNT:
      state.count = state.count - 1;
      return;

    case SET_VALUE_TO_ADD:
      state.valueToAdd = action.payload;
      return;
    case ADD_VALUE_TO_COUNT:
      state.count = state.count + state.valueToAdd;
      state.valueToAdd = 0;
      return;
    //if none of the above cases matched, at the very least we return state so we don't wipe it out
    default:
      return state;
  }

  // if (action.type === DECREMENT_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count - 1,
  //   };
  // }
  //action.payload carries any DATA the update needs
  // if (action.type === SET_VALUE_TO_COUNT) {
  //   return {
  //     ...state,
  //     valueToAdd: action.payload,
  //   };
  // }
  // if (action.type === ADD_VALUE_TO_COUNT) {
  //   return {
  //     ...state,
  //     count: state.count + state.valueToAdd,
  //     valueToAdd: 0,
  //   };
  // }
  //always make sure we return state as the defualt return after our conditions
  // return state;
};

const CounterPage = (props) => {
  const { initialCount } = props;
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = () => {
    dispatch({ type: INCREMENT_COUNT });
  };

  const decrement = () => {
    dispatch({ type: DECREMENT_COUNT });
  };

  const handleChange = (event) => {
    //every value out of an input is a STRING. parseInt turns it into a
    //number, and an empty input gives '' -- which parseInt reads as NaN
    // `|| 0` catches that, so valueToAdd is always usable number.
    const value = parseInt(event.target.value) || 0;
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: ADD_VALUE_TO_COUNT,
    });
  };

  return (
    <div>
      <p className="text-5xl font-bold tabular-nums mb-4">{initialCount}</p>

      <div className="flex gap-2">
        <button
          onClick={increment}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        >
          +1
        </button>
        <button
          onClick={decrement}
          className="rounded border border-gray-300  px-4 py-2 hover:bg-gray-700"
        >
          -1
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex items-end gap-2">
        <label className="block text-sm text-gray-600" htmlFor="add">
          Add a number
        </label>
        {/* valueToAdd || `` -- otherwise the field shows a 0 
        the user has to delete before they can type anything */}
        <input
          id="add"
          type="number"
          value={state.valueToAdd || ""}
          onChange={handleChange}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        />
        <button className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700">
          Add it
        </button>
      </form>
    </div>
  );
};

export default CounterPage;
