import React, { useEffect, useState } from 'react';
import WrtFooter from '../components/WrtFooter';
import WrtHeader from '../components/WrtHeader';
import WrtJobCards from '../components/WrtJobCards';
import JobsDataService from '../services/WrtJobServices';

export default function WrtMainPage() {

    const [jobs, setJobs] = useState([]);

    const [refreshEvent, setRefreshEvent] = useState(false);

    const refreshList = () => {
        setRefreshEvent(!refreshEvent);
    }

    useEffect(() => {
        getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshEvent]);

    const getJobs = async () => { // Get Jobs request
        const data = await JobsDataService.getAllJobs();
        //console.log(data)
        setJobs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    return (
        <>
            <WrtHeader refreshEvent={refreshList} />
            <div className="container">
                <div className="row mt-5 mb-5">

                    {jobs.map((doc, index) => {
                        return (
                            <WrtJobCards data={doc} key={index} refreshEvent={refreshList} />
                        )
                    })}

                </div>
            </div>
            <WrtFooter />
        </>
    )
}
