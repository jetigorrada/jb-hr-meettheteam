function TeamMemberCard({ member, index, total, onRemove, onEdit, onMoveUp, onMoveDown, isEditing }) {
  return (
    <div className={`member-card${isEditing ? ' editing' : ''}`}>
      {member.photoPreview ? (
        <img className="member-card-photo" src={member.photoPreview} alt={member.name} />
      ) : (
        <div className="member-card-photo-placeholder">No Photo</div>
      )}
      <div className="member-card-body">
        <div className="member-card-name">{member.name}</div>
        <div className="member-card-position">{member.position}</div>
        {member.description && (
          <div className="member-card-description">{member.description}</div>
        )}
      </div>
      <div className="member-card-actions">
        <button
          className="btn-icon"
          onClick={onMoveUp}
          disabled={index === 0}
          title="Move up"
        >
          ↑
        </button>
        <button
          className="btn-icon"
          onClick={onMoveDown}
          disabled={index === total - 1}
          title="Move down"
        >
          ↓
        </button>
        <button className="btn-icon" onClick={onEdit} title="Edit">
          ✎
        </button>
        <button className="btn-icon danger" onClick={onRemove} title="Remove">
          ✕
        </button>
      </div>
    </div>
  )
}

export default TeamMemberCard
