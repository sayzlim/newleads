export default function generateLeads(): void {
  const selector = "button[aria-label='Load more comments']";

  const createCsvAndButton = (): void => {
    const actors = Array.from(
      document.querySelectorAll<HTMLElement>('.comments-comment-meta__actor')
    );

    const rows = actors.map((actor) => {
      const name =
        actor
          .querySelector<HTMLElement>(
            '.comments-comment-meta__description-title'
          )
          ?.textContent?.trim() ?? '';

      const title =
        actor
          .querySelector<HTMLElement>(
            '.comments-comment-meta__description-subtitle'
          )
          ?.textContent?.trim() ?? '';

      const profileUrl =
        actor.querySelector<HTMLAnchorElement>(
          "a[href^='https://www.linkedin.com/in/']"
        )?.href ?? '';

      return [name, title, profileUrl];
    });

    // Remove duplicate entries based on profile URL or the combined name
    // and title when the profile URL is not available.
    const uniqueMap = new Map<string, [string, string, string]>();
    rows.forEach((r) => {
      const key = r[2] || `${r[0]}|${r[1]}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, r);
      }
    });
    const uniqueRows = Array.from(uniqueMap.values());

    const header = ['Name', 'Title', 'Profile URL'];
    const csv = [header, ...uniqueRows]
      .map((r) => r.map((f) => `"${f.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    let overlay = document.querySelector<HTMLDivElement>(
      '#linkedin-download-overlay'
    );
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'linkedin-download-overlay';
      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: '10000',
      });
      document.body.appendChild(overlay);
    }

    let container = overlay.querySelector<HTMLDivElement>(
      '#linkedin-download-container'
    );
    if (!container) {
      container = document.createElement('div');
      container.id = 'linkedin-download-container';
      container.setAttribute('role', 'dialog');
      container.setAttribute('aria-modal', 'true');
      Object.assign(container.style, {
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
        minWidth: '260px',
      });
      overlay.appendChild(container);
    }

    let button = container.querySelector<HTMLAnchorElement>(
      '#linkedin-comments-download'
    );
    if (!button) {
      button = document.createElement('a');
      button.id = 'linkedin-comments-download';
      button.textContent = 'Download CSV';
      button.className = 'btn btn-primary mt-4';
      button.setAttribute('aria-label', 'Download comments as CSV');
      button.addEventListener('click', () => {
        overlay?.remove();
      });
      container.appendChild(button);
    }

    button.href = url;
    button.download = 'linkedin_comments.csv';
  };

  const clickUntilGone = (): void => {
    const button = document.querySelector<HTMLButtonElement>(selector);
    if (!button) {
      createCsvAndButton();
      return;
    }
    button.click();
    setTimeout(clickUntilGone, 2000);
  };

  clickUntilGone();
}
