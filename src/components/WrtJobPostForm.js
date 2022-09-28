import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import JobsDataService from '../services/WrtJobServices';


export default function WrtJobPostForm(props) {


    const [jobTitle, setJobTitle] = useState('');
    const [jobFun, setJobFun] = useState('');
    const [jobType, setJobType] = useState('');
    const [jobExp, setJobExp] = useState('');
    const [jobSalary, setJobSalary] = useState('');
    const [jobExpire, setJobExpire] = useState('');
    const [jobLocation, setJoblocation] = useState('');
    const [jobSkills, setJobSkills] = useState('');
    const [jobComLogo, setJobComLogo] = useState('');

    const [wrtCaptcha, setCaptcha] = useState('');


    const [message, setMessage] = useState({ error: false, msg: "" });

    const [btnText, setBtnText] = useState("Post Job");
    const [btnTextUpdate, setBtnTextUpdate] = useState("Update Job");


    const genCaptcha = (length) => {
        for (var s = ''; s.length < length; s += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62 | 0));
        return s;
    }
    const [wrtCaptchaGne, setCaptchaGen] = useState(genCaptcha('5'));

    const uploadLogo = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        //console.log(base64);
        setJobComLogo(base64);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (err) => {
                reject(err);
            };
        })
    }

    useEffect(() => {
        if (props.type === 'update') {
            setJobTitle(props.data.job_title);
            setJobFun(props.data.job_fun);
            setJobType(props.data.job_type);
            setJobExp(props.data.job_exp);
            setJobSalary(props.data.job_salary);
            setJobExpire(props.data.job_expire);
            setJoblocation(props.data.job_location);
            setJobSkills(props.data.job_skills);
            setJobComLogo(props.data.logo);

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formRequest = async (id) => {

        setMessage('');
        //console.log(props.type);
        if (!jobTitle || !jobFun || !jobType || !jobExp || !jobSalary || !jobExpire || !jobLocation || !jobSkills || !jobComLogo) {
            setMessage({ error: true, msg: "All fields are mandatory!" }); //Validate Input
            return;
        }

        if (wrtCaptcha !== wrtCaptchaGne) { // validate Captcha
            setMessage({ error: true, msg: "Invalid Captcha!" });
            return;
        }

        setBtnText('Please Wait...');
        setBtnTextUpdate('Please Wait...');

        

        const jobPostData = {
            job_title: jobTitle,
            job_fun: jobFun,
            job_type: jobType,
            job_exp: jobExp,
            job_salary: jobSalary,
            job_expire: jobExpire,
            job_location: jobLocation,
            job_skills: jobSkills,
            logo: jobComLogo
        }


        if(props.type === 'post'){
            try { //create a new job
                await JobsDataService.postJobs(jobPostData);
                setMessage({ error: false, msg: "New job added successfully!" });
                props.refreshList();
            } catch (err) {
                setMessage({ error: true, msg: err.message });
                setBtnText('Post Job');
                return;
            }
            
        }else{
            try { //update job request
                await JobsDataService.updateJob(id, jobPostData);
                setMessage({ error: false, msg: "Job Updated successfully!" });
                props.refreshList();
            } catch (err) {
                setMessage({ error: true, msg: err.message });
                setBtnTextUpdate('Update Job');
                return;
            }
        }

        setBtnText('Post Job');
        props.modalClose();
    };

    return (
        <>
            {message?.msg && (
                <Alert
                    variant={message?.error ? "danger" : "success"}
                    dismissible
                    onClose={() => setMessage("")}
                >
                    {message?.msg}
                </Alert>
            )}
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-job-title">Job Title</label>
                        <input type="text" className="form-control" onChange={(e) => setJobTitle(e.target.value)} placeholder="" id="wrt-job-title" value={jobTitle} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-job-fun">Job Function</label>
                        <input type="text" className="form-control" onChange={(e) => setJobFun(e.target.value)} placeholder="" id="wrt-job-fun" value={jobFun} />
                    </div>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-job-type">Job Type</label>
                        <input type="text" className="form-control" onChange={(e) => setJobType(e.target.value)} placeholder="" id="wrt-job-type" value={jobType} />
                    </div>
                </div>

                <div className="col-md-6 mb-2">
                    <div className="form-group">
                        <label htmlFor="wrt-exp">Experience</label>
                        <input type="number" className="form-control" id="wrt-exp" onChange={(e) => setJobExp(e.target.value)} placeholder="" value={jobExp} />
                    </div>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-salary">Salary</label>
                        <input type="text" className="form-control" id="wrt-salary" onChange={(e) => setJobSalary(e.target.value)} placeholder="" value={jobSalary} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-expire">Job Expires in</label>
                        <input type="date" className="form-control" id="wrt-expire" onChange={(e) => setJobExpire(e.target.value)} placeholder="" value={jobExpire} />
                    </div>
                </div>
            </div>

            <div className="row mb-3">


                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-loc">Location</label>
                        <input type="text" className="form-control" id="wrt-loc" onChange={(e) => setJoblocation(e.target.value)} placeholder="" value={jobLocation} />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-skills">Skills</label>
                        <input type="text" className="form-control" id="wrt-skills" onChange={(e) => setJobSkills(e.target.value)} placeholder="" value={jobSkills} />
                    </div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-salary">Company Logo</label>
                        <input type="file" className="form-control" id="wrt-salary" onChange={(e) => uploadLogo(e)} placeholder="" />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="wrt-expire">Enter Captcha <span className='captcha_wraper'>{wrtCaptchaGne}</span><span className='reload_captcha' onClick={() => setCaptchaGen(genCaptcha('5'))}>↻</span></label>
                        <input type="text" className="form-control" id="wrt-expire" onChange={(e) => setCaptcha(e.target.value)} placeholder="" />
                    </div>
                </div>
            </div>
            <div className='clearfix btn-right mt-3'>
                <Button variant="secondary" className='float-right me-2' onClick={props.modalClose}>
                    Cancel
                </Button>

                {props.type === "update" ? <Button variant="success" className='float-right ms-2' onClick={() => formRequest(props.data.id)}>{btnTextUpdate}</Button> : <Button variant="success" className='float-right ms-2' onClick={() => formRequest('')}>{btnText}</Button>}
                
            </div>

        </>
    )
}
