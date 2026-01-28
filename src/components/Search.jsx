export default function Search () {
    function search(items) {
        const query = items.get("query");
    }
    return (
        <form action={search}>
            <input name="query" /> 
            <button type="submit">Search</button>

        </form>
    )
}