import { useMemo } from 'react'
import { generateEmailHtml } from '../utils/emailTemplate'

function EmailPreview({ members, emailTitle, emailDateRange, onClose, onCopyHtml }) {
  const htmlContent = useMemo(
    () => generateEmailHtml(members, emailTitle, emailDateRange),
    [members, emailTitle, emailDateRange]
  )

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Email Template Preview</h2>
          <button className="btn-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <iframe
            title="Email Preview"
            srcDoc={htmlContent}
            style={{
              width: '100%',
              minHeight: '600px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              background: '#fff',
            }}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-send" onClick={onCopyHtml}>
            Copy Template for Email
          </button>
          <button className="btn btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmailPreview
