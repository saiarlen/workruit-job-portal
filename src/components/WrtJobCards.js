import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from 'react-moment';
import Modal from 'react-bootstrap/Modal';
import WrtJobPostForm from './WrtJobPostForm';
import { Linkedin, Facebook, Twitter } from 'react-bootstrap-icons';
import { getFacebookUrl, getLinkedinUrl, getTwitterUrl } from "@phntms/react-share";



export default function WrtJobCards(props) {

  //console.log(props)

  const date = new Date();

  const [formShow, setFormShow] = useState(false);

  const handleFormClose = () => setFormShow(false);
  const handleFormShow = () => setFormShow(true);

  const [showSocials, setShowSocials] = useState(false);


  return (
    <div className='col-md-12' id={props.data.id}>

      <div className="job-card">
        <div className="job-card__wrp">
          <div className="job-card__item">
            <div className="job-card__img">
              <img src={props.data.logo} alt="logo" />
            </div>
            <div className="job-card__content">
              <span className="job-card__code">Expiry: <Moment to={props.data.job_expire}><Moment format="YYYY-MM-DD" withTitle>
                {date}
              </Moment></Moment></span>
              <div className="job-card__title">{props.data.job_title}</div>
              <div className="job-card__text">{props.data.job_fun}</div>
              <div className='job_card__buttons'>
                <a href="!#" className="job-card__button me-2" onClick={(e) => { e.preventDefault(); handleFormShow() }} >Edit</a>
                <a href="!#" className="job-card__button bgc-2" onClick={(e) => { e.preventDefault(); setShowSocials(!showSocials) }}>Share Job</a>
                {showSocials && <div className='social_icons'>
                  <a href={getFacebookUrl({ url: window.location.href + props.data.id, quote: props.data.job_titl })} rel="noreferrer" target="_blank">
                    <Facebook size={20} />
                  </a>
                  <a href={getLinkedinUrl({ url: window.location.href + props.data.id, title: props.data.job_title, summary: props.data.job_fun })} rel="noreferrer" target="_blank">
                    <Linkedin className='text-info' size={20} />
                  </a>
                  <a href={getTwitterUrl({ url: window.location.href + props.data.id, text: props.data.job_title })} rel="noreferrer" target="_blank">
                    <Twitter className='text-secondary' size={20} />
                  </a>
                </div>}
              </div>

            </div>

            <div className="job-card__content">
              <ListGroup>
                <ListGroup.Item><strong>Location:</strong> {props.data.job_location}</ListGroup.Item>
                <ListGroup.Item><strong>Experience:</strong> {props.data.job_exp}</ListGroup.Item>
                <ListGroup.Item><strong>Job Type:</strong> {props.data.job_type}</ListGroup.Item>
                <ListGroup.Item><strong>Salary:</strong> {props.data.job_salary}</ListGroup.Item>
                <ListGroup.Item><strong>Skills</strong> {props.data.job_skills}</ListGroup.Item>
              </ListGroup>
            </div>
          </div>

        </div>
      </div>
      <Modal
        size="lg"
        show={formShow}
        onHide={handleFormClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Update Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WrtJobPostForm
            modalClose={handleFormClose}
            type={'update'}
            data={props.data}
            refreshList={props.refreshEvent}

          />
        </Modal.Body>

      </Modal>

    </div>

  )
}
