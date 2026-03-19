import { useState, useEffect, useRef } from 'react'

function TeamMemberForm({ onAdd, editingMember, onCancelEdit }) {
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [description, setDescription] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name)
      setPosition(editingMember.position)
      setDescription(editingMember.description)
      setPhotoUrl(editingMember.photoUrl || '')
      setPhotoPreview(editingMember.photoPreview || '')
    }
  }, [editingMember])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
      setPhotoUrl('')
    }
    reader.readAsDataURL(file)
  }

  const resetForm = () => {
    setName('')
    setPosition('')
    setDescription('')
    setPhotoUrl('')
    setPhotoPreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !position.trim()) return

    onAdd({
      name: name.trim(),
      position: position.trim(),
      description: description.trim(),
      photoUrl: photoUrl.trim(),
      photoPreview: photoPreview,
    })

    resetForm()
  }

  const canSubmit = name.trim() && position.trim()

  return (
    <>
      <h2>{editingMember ? 'Edit Member' : 'Add Team Member'}</h2>
      <form className="member-form" onSubmit={handleSubmit}>
        {/* Photo upload */}
        <div className="photo-upload-area">
          <div className="photo-preview">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" />
            ) : (
              <span className="photo-preview-placeholder">No Photo</span>
            )}
          </div>
          <div className="photo-upload-controls">
            <label>Photo</label>
            <div className="photo-input-row">
              <button
                type="button"
                className="btn-upload"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            placeholder="e.g. Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Position */}
        <div className="form-group">
          <label>Position *</label>
          <input
            type="text"
            placeholder="e.g. Senior Developer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            placeholder="A short bio or fun fact about this person..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          {editingMember && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={() => {
                resetForm()
                onCancelEdit()
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-add" disabled={!canSubmit}>
            {editingMember ? 'Update Member' : 'Add Member'}
          </button>
        </div>
      </form>
    </>
  )
}

export default TeamMemberForm
