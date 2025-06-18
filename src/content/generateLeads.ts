export default function generateLeads(): void {
  const selector = "button[aria-label='Load more comments']";

  const clickUntilGone = (): void => {
    const button = document.querySelector<HTMLButtonElement>(selector);
    if (!button) {
      return;
    }
    button.click();
    setTimeout(clickUntilGone, 2000);
  };

  clickUntilGone();
}
