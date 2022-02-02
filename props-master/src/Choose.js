function Choose(props) {
    const {
        twitterCheck,
        redditCheck,
        youtubeCheck,
        setIsCheckedTwitter,
        setIsCheckedReddit,
        setIsCheckedYoutube
    } = props;
    const handleOnChangeTwitter = () => {
        setIsCheckedTwitter(!twitterCheck);
    };
    const handleOnChangeReddit = () => {
        setIsCheckedReddit(!redditCheck);
    };
    const handleOnChangeYoutube = () => {
        setIsCheckedYoutube(!youtubeCheck);
    };
    return (
        <div>
            <div>
                <input
                    type="checkbox"
                    id="twitter"
                    name="twitter"
                    value="Twitter"
                    checked={twitterCheck}
                    onChange={handleOnChangeTwitter}
                />
                Twitter
            </div>
            <div>
                <input
                    type="checkbox"
                    id="reddit"
                    name="reddit"
                    value="Reddit"
                    checked={redditCheck}
                    onChange={handleOnChangeReddit}
                />
                Reddit
            </div>
            <div>
                <input
                    type="checkbox"
                    id="youtube"
                    name="youtube"
                    value="YouTube"
                    checked={youtubeCheck}
                    onChange={handleOnChangeYoutube}
                />
                YouTube
            </div>
        </div>
    )
}

export default Choose;