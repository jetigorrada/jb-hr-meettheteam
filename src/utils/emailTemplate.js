/**
 * Generates the email-client-compatible HTML template that matches
 * the "Meet the Team" design exactly.
 * All colors are hardcoded inline to survive clipboard copy into email clients.
 */
export function generateEmailHtml(members, title, dateRange) {
  const memberRows = members
    .map(
      (m) => {
        const photo = m.photoPreview
          ? '<img src="' + m.photoPreview + '" alt="' + m.name + '" width="220" height="270" style="display:block; width:220px; height:270px; object-fit:cover; border: 3px solid #2BBCB3; border-radius: 4px;" />'
          : '<div style="width:220px; height:270px; background:#edf2f7; border:3px solid #2BBCB3; border-radius:4px; text-align:center; line-height:270px; color:#a0aec0; font-size:14px;">No Photo</div>'

        return '<tr>' +
          '<td style="padding: 20px 30px;">' +
            '<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
              '<td width="240" valign="top" style="padding-right: 24px;">' + photo + '</td>' +
              /* Solid teal bar */
              '<td width="4" style="background:#2BBCB3; width:4px; padding:0; font-size:0;"></td>' +
              /* Card content with pill/rounded border */
              '<td valign="top" style="border: 1px solid #e0e0e0; border-left: none; border-radius: 0 20px 20px 0; padding: 18px 24px; background: #f9fafb;">' +
                '<p style="margin:0 0 4px 0; font-size:24px; font-weight:bold; color:#2BBCB3; text-transform:uppercase; letter-spacing:2px; font-family: Agency FB, Segoe UI, Tahoma, sans-serif;">' + m.name + '</p>' +
                '<p style="margin:0 0 14px 0; font-size:16px; font-weight:bold; color:#000000; text-transform:uppercase; letter-spacing:1px; font-family: Agency FB, Segoe UI, Tahoma, sans-serif;">' + m.position + '</p>' +
                '<p style="margin:0; font-size:14px; color:#333333; line-height:1.7; font-family: Agency FB, Segoe UI, Tahoma, sans-serif;">' + (m.description || '') + '</p>' +
              '</td>' +
            '</tr></table>' +
          '</td>' +
        '</tr>'
      }
    )
    .join('\n')

  const heading = title + (dateRange ? ' (' + dateRange + ')' : '')

  return '<!DOCTYPE html>' +
    '<html><head><meta charset="utf-8"></head>' +
    '<body style="margin:0; padding:0; background:#ffffff; font-family: Agency FB, Segoe UI, Tahoma, sans-serif;">' +
    '<table width="900" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto; background:#ffffff;">' +
      '<tr><td style="background:#2BBCB3; height:8px; font-size:0; line-height:0;">&nbsp;</td></tr>' +
      '<tr><td style="background:#ffffff; padding:24px 30px 20px 30px; text-align:center;">' +
        '<h1 style="margin:0; font-size:26px; font-weight:800; color:#1a1a1a; text-transform:uppercase; letter-spacing:2.5px; font-family: Agency FB, Segoe UI, Tahoma, sans-serif;">' + heading + '</h1>' +
      '</td></tr>' +
      '<tr><td style="padding:0 30px;"><div style="height:3px; background:#2BBCB3;"></div></td></tr>' +
      memberRows +
      '<tr><td style="background:#2BBCB3; height:8px; font-size:0; line-height:0;">&nbsp;</td></tr>' +
    '</table>' +
    '</body></html>'
}
