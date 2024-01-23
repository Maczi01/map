import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

async function enableMocking() {
    if (process.env.NODE_ENV === 'prod') {
        return;
    }

    const { worker } = await import('./app/mocks/browser');

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

enableMocking().then(() => {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
});
