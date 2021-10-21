import React from 'react';
import Authenticated from '@/Layouts/Authenticated';


export default function Dashboard(props) {
    return (
        <Authenticated headers={['Home']} title="Dashboard | Home">
            test
        </Authenticated>
    )
}
