import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorised } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    
    fetch("https://jobzee-to3i.onrender.com/api/v1/job/getall", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.success === true) {
          
          setJobs(data.jobs);
         
        } else {
           toast.error(data.message);
        }
      })
      .catch((err) => console.log(`in error ${err}`));
  }, []);

  if (!isAuthorised) {
    navigateTo("/login");
  }
  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {
          
           jobs.length>0? jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            }):<h3>No jobs available</h3>}
           
        </div>
      </div>
    </section>
  );
};

export default Jobs;
