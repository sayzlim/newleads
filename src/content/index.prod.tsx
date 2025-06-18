import styles from '@assets/styles/index.css?inline';
import createShadowRoot from '@utils/createShadowRoot';

import generateLeads from './generateLeads';

import Content from './Content';

const root = createShadowRoot(styles);

root.render(<Content />);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'generate-leads') {
    generateLeads();
  }
});
