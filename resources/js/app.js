require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import './Assets/css/custom.css';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

export const AuthContext = React.createContext(null);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        const auth = props.initialPage.props.auth.user;
        return render(
            <AuthContext.Provider value={auth}>
                <App {...props} />
            </AuthContext.Provider>,
            el
        );
    },
});

InertiaProgress.init({ color: '#2563eb' });
