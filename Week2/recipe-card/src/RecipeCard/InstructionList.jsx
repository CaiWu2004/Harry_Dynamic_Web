import styles from "./RecipeCard.module.css";

const InstructionList = (props) => {
  const { instructions } = props;
  return (
    <div className={styles.instruction_list}>
      <h3 className={styles.list_title}>Instructions</h3>
      <ol>
        {instructions.map((instruction, index) => {
          return <li key={index}>{instruction}</li>;
        })}
      </ol>
    </div>
  );
};

export default InstructionList;
