// On a computer, "mailto:" opens whatever mail program is set as default (for
// example Outlook). Gmail's compose page works for everyone with a Gmail account,
// so computers get that. Phones keep "mailto:" so their own default mail app opens.
const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export function emailProps(email) {
  if (isMobile()) return { href: `mailto:${email}` };
  return {
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}