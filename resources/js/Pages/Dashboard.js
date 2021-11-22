import React from 'react';
import Authenticated from '@/Layouts/Authenticated';


export default function Dashboard(props) {
    const headers = [
        {
            title: 'Dashboard',
            url: route('backend.dashboard')
        }
    ]
    return (
        <Authenticated headers={headers} title="Dashboard | Home">
            test
        </Authenticated>
    )
}
