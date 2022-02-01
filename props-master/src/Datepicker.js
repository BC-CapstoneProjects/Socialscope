import * as React from 'react';
import {Col, Row} from "react-bootstrap";

export default function DateChoose() {
    const [value, setValue] = React.useState();

    return (
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
        //     <DateRangePicker
        //         startText="Check-in"
        //         endText="Check-out"
        //         value={value}
        //         onChange={(newValue) => {
        //             setValue(newValue);
        //         }}
        //         renderInput={(startProps, endProps) => (
        //             <React.Fragment>
        //                 <TextField {...startProps} />
        //                 <Box sx={{ mx: 2 }}> to </Box>
        //                 <TextField {...endProps} />
        //             </React.Fragment>
        //         )}
        //     />
        // </LocalizationProvider>
        <div>
            <p><b>Pick a date</b></p>
            <Row  className='page-title'>
                <Col>
                    <form>
                        <p>
                            <b>From </b>
                            <span>
                                <input
                                    type="date"
                                    onChange={event => setValue(event.target.value)}
                                >
                                </input>
                            </span>
                        </p>
                    </form>
                </Col>
                <Col>
                    <form>
                        <p>
                            <b>To </b>
                            <span>
                                <input
                                    type="date"
                                    onChange={event => setValue(event.target.value)}
                                >
                                </input>
                            </span>
                        </p>
                    </form>
                </Col>
            </Row>
        </div>
    );
}