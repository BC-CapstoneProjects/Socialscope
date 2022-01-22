import React, { useEffect, useState  } from 'react';

let progressInterval = null;

function Progressbar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        progressInterval = setInterval(() => {
            setProgress(prev => prev + 1);
        }, 100);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, [progress]);

    return (
        <div className="m-5">
            <div className="progress w-100" style={{ height: 30 }}>
                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progress}%` }}>{progress}%</div>
            </div>
        </div>
    );
}

export default Progressbar;
