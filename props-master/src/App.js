
import './App.css';
import Input from "./Input";
import Choose from "./Choose";
import {Submit} from "./Submit";
import {useState} from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isCheckedTwitter, setIsCheckedTwitter] = useState(false);
  const [isCheckedReddit, setIsCheckedReddit] = useState(false);
  const [isCheckedYoutube, setIsCheckedYoutube] = useState(false);
  return (
    <div className="App">
      <Input
          keyword={keyword}
          setKeyword={setKeyword}
      >
      </Input>
      <Choose
          twitterCheck={isCheckedTwitter}
          redditCheck={isCheckedReddit}
          youtubeCheck={isCheckedYoutube}
          setIsCheckedTwitter={setIsCheckedTwitter}
          setIsCheckedReddit={setIsCheckedReddit}
          setIsCheckedYoutube={setIsCheckedYoutube}
      >
      </Choose>
        <Submit
            kw={keyword}
            twitterCheck={isCheckedTwitter}
            redditCheck={isCheckedReddit}
            youtubeCheck={isCheckedYoutube}
        >
        </Submit>
    </div>
  );
}

export default App;
