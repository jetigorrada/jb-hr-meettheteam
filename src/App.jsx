import { useState, useRef } from 'react'
import TeamMemberForm from './components/TeamMemberForm'
import TeamMemberCard from './components/TeamMemberCard'
import EmailPreview from './components/EmailPreview'
import { generateEmailHtml } from './utils/emailTemplate'
import './App.css'

function App() {
  const [members, setMembers] = useState([])
  const [showPreview, setShowPreview] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [emailTitle, setEmailTitle] = useState('Njihuni me anëtarët më të rinj të ekipit tonë')
  const [emailDateRange, setEmailDateRange] = useState('9-15 Mars 2026')

  const handleAddMember = (member) => {
    if (editingIndex !== null) {
      setMembers((prev) => prev.map((m, i) => (i === editingIndex ? member : m)))
      setEditingIndex(null)
    } else {
      setMembers((prev) => [...prev, member])
    }
  }

  const handleRemoveMember = (index) => {
    setMembers((prev) => prev.filter((_, i) => i !== index))
  }

  const handleEditMember = (index) => {
    setEditingIndex(index)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
  }

  const handleMoveMember = (index, direction) => {
    setMembers((prev) => {
      const copy = [...prev]
      const target = index + direction
      if (target < 0 || target >= copy.length) return copy
      ;[copy[index], copy[target]] = [copy[target], copy[index]]
      return copy
    })
  }

  const handleCopyHtml = async () => {
    const html = generateEmailHtml(members, emailTitle, emailDateRange)
    try {
      const blob = new Blob([html], { type: 'text/html' })
      const clipboardItem = new ClipboardItem({ 'text/html': blob })
      await navigator.clipboard.write([clipboardItem])
      alert('Email template copied to clipboard! Paste it into Outlook or your email client.')
    } catch {
      // Fallback: select & copy from a hidden element
      const tempEl = document.createElement('div')
      tempEl.innerHTML = html
      tempEl.style.position = 'fixed'
      tempEl.style.left = '-9999px'
      document.body.appendChild(tempEl)
      const range = document.createRange()
      range.selectNodeContents(tempEl)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
      document.execCommand('copy')
      sel.removeAllRanges()
      document.body.removeChild(tempEl)
      alert('Email template copied to clipboard! Paste it into Outlook or your email client.')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Meet the Team Builder</h1>
        <p className="subtitle">Add team members and generate an email template</p>
      </header>

      <main className="app-main">
        {/* Email header settings */}
        <section className="form-section">
          <h2>Email Header</h2>
          <div className="header-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={emailTitle}
                onChange={(e) => setEmailTitle(e.target.value)}
                placeholder="e.g. Njihuni me anëtarët më të rinj të ekipit tonë"
              />
            </div>
            <div className="form-group">
              <label>Date Range</label>
              <input
                type="text"
                value={emailDateRange}
                onChange={(e) => setEmailDateRange(e.target.value)}
                placeholder="e.g. 9-15 Mars 2026"
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <TeamMemberForm
            onAdd={handleAddMember}
            editingMember={editingIndex !== null ? members[editingIndex] : null}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="cards-section">
          <h2>
            Team Members
            {members.length > 0 && <span className="badge">{members.length}</span>}
          </h2>

          {members.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <p>No team members yet. Use the form above to add people.</p>
            </div>
          ) : (
            <div className="cards-grid">
              {members.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  member={member}
                  index={index}
                  total={members.length}
                  onRemove={() => handleRemoveMember(index)}
                  onEdit={() => handleEditMember(index)}
                  onMoveUp={() => handleMoveMember(index, -1)}
                  onMoveDown={() => handleMoveMember(index, 1)}
                  isEditing={editingIndex === index}
                />
              ))}
            </div>
          )}
        </section>

        {members.length > 0 && (
          <section className="actions-section">
            <button className="btn btn-preview" onClick={() => setShowPreview(true)}>
              Preview Email Template
            </button>
            <button className="btn btn-send" onClick={handleCopyHtml}>
              Copy Template for Email
            </button>
          </section>
        )}
      </main>

      {showPreview && (
        <EmailPreview
          members={members}
          emailTitle={emailTitle}
          emailDateRange={emailDateRange}
          onClose={() => setShowPreview(false)}
          onCopyHtml={handleCopyHtml}
        />
      )}
    </div>
  )
}

export default App
