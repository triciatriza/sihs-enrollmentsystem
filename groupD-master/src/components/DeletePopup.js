import React from 'react'
import './DeletePopup.css'

const DeletePopup = (props) => {
    return (props.trigger) ? (
        <div className="deletepopup">
            <div className="deletepopupinner">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this?</p>
                <div className="popupbuttons">
                    <button className="nobutton" onClick={() =>
                        props.setTrigger(false)}>NO</button>
                    <button className="yesbutton">YES</button>
                    { props.children }
                </div>
            </div>
        </div>
    ) : "" ;
};

export default DeletePopup;