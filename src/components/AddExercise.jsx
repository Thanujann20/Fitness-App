import "../styles/addExercise.css"

export default function AddExercise() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const weight = e.target.weight.value;
        const set = e.target.sets.value;
        const reps = e.target.reps.value;

        // call parent handler
        onAdd({ name, weight, reps });

        e.target.reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="name"> Name: </label>
                    <input type="text" id="name" name="name" />
                </p>
                <p>
                    <label htmlFor="weight"> Weight: </label>
                    <input type="text" id="weight" name="weight" />
                </p>
                 <p>
                    <label htmlFor="sets"> Sets: </label>
                    <input type="text" id="sets" name="sets" />
                </p>
                <p>
                    <label htmlFor="reps"> Reps: </label>
                    <input type="text" id="reps" name="reps" />
                </p>
                <p className="button">
                    <button type="submit">Add Exercise</button>
                </p>
            </form>
        </div>
    )
}