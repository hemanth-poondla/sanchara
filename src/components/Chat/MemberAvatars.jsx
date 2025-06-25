import React from 'react';

const MemberAvatars = ({ members }) => {
  return (
    <div className="member-avatars -space-x-2">
      {members.map((member) => (
        member.avatar ? (
          <img 
            key={member.id}
            src={member.avatar} 
            className="member-avatar" 
            alt={member.name}
          />
        ) : (
          <div 
            key={member.id}
            className="member-initials"
          >
            {member.initials}
          </div>
        )
      ))}
    </div>
  );
};

export default MemberAvatars;