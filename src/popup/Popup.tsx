import { JSX } from 'react';

export default function Popup(): JSX.Element {
  const handleGenerateLeads = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, { type: 'generate-leads' });
      }
    });
  };

  const handleToggleUi = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, { type: 'toggle-ui' });
      }
    });
  };

  return (
    <div id='my-ext' className='container space-y-2' data-theme='light'>
      <button
        type='button'
        className='btn btn-primary w-full'
        onClick={handleGenerateLeads}
      >
        Generate Leads from LinkedIn post
      </button>
      <button
        type='button'
        className='btn btn-secondary w-full'
        onClick={handleToggleUi}
      >
        Toggle Tools
      </button>
    </div>
  );
}
