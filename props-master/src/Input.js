// Input.propTypes = {
//     keyword: PropTypes.string,
//     setKeyword: PropTypes.func
// }
function Input(props) {
    const {keyword, setKeyword} = props;
    return (
        <div>
            <label>Enter :
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </label>
        </div>
    )
}

export default Input;