import WatchLiveTemplate from '@/modules/home/template/WatchLiveTemplate'
import React from 'react'


export default async function Page({ params }: { params: Promise<{  roomId: string }> }) {

    const { roomId } = await params;


    return <WatchLiveTemplate roomId={roomId} />;
}