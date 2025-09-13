import React, { useContext, useState,useEffect } from 'react'
import {useNavigate,useParams,Link} from 'react-router-dom'
import { Context } from '../../main';
import { IoEllipseSharp } from 'react-icons/io5';

const JobDetails = () => {
  const {id}=useParams()
  const [job,setJob]=useState({});
  const navigateTo=useNavigate();
  const {isAuthorised,user}=useContext(Context);

  useEffect(()=>{
    fetch(`https://jobzee-to3i.onrender.com/api/v1/job/${id}`,{
      method:"GET",
      credentials:"include"
    })
    .then(response=>response.json())
    .then((data)=>{
      if(data.success===true){
        setJob(data.job);
      }
      else{

      }
    })
    .catch((e)=>console.log(`in error ${e}`));
  },[])

  if(!isAuthorised){
    navigateTo('/login');
  }


  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryto}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default JobDetails
