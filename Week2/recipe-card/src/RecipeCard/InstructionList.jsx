const InstructionList = (props) => {
  const { instructions } = props;
  return (
    <div className="instruction_list">
      <h3 className="list_title">Instructions</h3>
      <ol>
        {instructions.map((instruction, index) => {
          return <li key={index}>{instruction}</li>;
        })}
      </ol>
    </div>
  );
};

export default InstructionList;
