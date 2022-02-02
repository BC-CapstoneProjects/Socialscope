import {useState} from "react";
import JSONPretty from 'react-json-pretty';
export function Submit(props)
{
    const [result, setResult] = useState(undefined);
    const handleOnclick = () => {
        fetch(`http://localhost:8080/?keyword=${props.kw}&twitterChoose=${props.twitterCheck}&redditChoose=${props.redditCheck}&youtubeChoose=${props.youtubeCheck}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setResult(result);
                    // const count = Object.keys(result).length;
                    // console.log(count);
                    alert(JSON.stringify(result));
                },
                (error) => {
                    alert(error);
                }
            )
    }
    return (
        <div>
            <input type="button" onClick={handleOnclick} Submit/>
            <div>
                <JSONPretty id="json-pretty" data={result}></JSONPretty>
            </div>
        </div>
    )
}