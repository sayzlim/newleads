import styles from '@assets/styles/index.css?inline';
import createShadowRoot from '@utils/createShadowRoot';
import { type Root } from 'react-dom/client';

import generateLeads from './generateLeads';
import Content from './Content';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

const mount = () => {
  const result = createShadowRoot(styles);
  root = result.root;
  container = result.container;
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
