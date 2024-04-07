import React from 'react';

function ComplaintModal(props) {
  const complaint = props.complaint;
  const requesterInfo = props.requesterInfo;
  console.info(props);
  return (
    <div>
      <p>
        작성자 : {requesterInfo.emoji} {requesterInfo.notionId}
      </p>
      <p>{complaint.content}</p>
    </div>
  );
}

export default ComplaintModal;
