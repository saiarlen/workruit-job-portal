import { db } from "../FirebaseConfig";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";


const jobCollectionRef = collection(db, "wrt_jobs");

class JobsDataService {

    getAllJobs = () => {
        return getDocs(jobCollectionRef);
    };

    postJobs = (newJob) => {
        return addDoc(jobCollectionRef, newJob);
    };

    updateJob = (id, updatedJob) => {
        const jobDoc = doc(db, 'wrt_jobs', id);
        return updateDoc(jobDoc, updatedJob);

    };

    getJob = (id) => {
        const jobDoc = doc(db, 'wrt_jobs', id);
        return getDoc(jobDoc);
    }

    deleteJob = (id) => {
        const jobDoc = doc(db, 'wrt_jobs', id);
        return deleteDoc(jobDoc);
    }

}

export default new JobsDataService();