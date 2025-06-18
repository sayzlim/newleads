/**
 * Initializes the application with Hot Module Replacement (HMR) support for CSS changes.
 * The UI is mounted only when the popup sends a toggle message.
 */
import { createRoot, type Root } from 'react-dom/client';

import generateLeads from './generateLeads';
import Content from './Content';

import '@assets/styles/index.css';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

const mount = () => {
  container = document.createElement('div');
  const styleElement = document.querySelector('style[data-vite-dev-id]');
  if (!styleElement) {
    throw new Error('Style element with attribute data-vite-dev-id not found.');
  }
  const shadowRoot = container.attachShadow({ mode: 'open' });
  shadowRoot.appendChild(styleElement.cloneNode(true));
  document.body.appendChild(container);
  root = createRoot(shadowRoot);
  root.render(<Content />);
};

const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
  if (container) {
    container.remove();
    container = null;
  }
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'generate-leads') {
    generateLeads();
  } else if (message.type === 'toggle-ui') {
    if (root) {
      unmount();
    } else {
      mount();
    }
  }
});
