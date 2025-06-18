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

    const header = ['Name', 'Title', 'Profile URL'];
    const csv = [header, ...rows]
      .map((r) => r.map((f) => `"${f.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    let button = document.querySelector<HTMLAnchorElement>(
      '#linkedin-comments-download'
    );
    if (!button) {
      button = document.createElement('a');
      button.id = 'linkedin-comments-download';
      button.textContent = 'Download CSV';
      button.className = 'btn btn-primary';
      Object.assign(button.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '10000',
      });
      document.body.appendChild(button);
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
