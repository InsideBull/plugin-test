import * as React from "react"
import ReactJWPlayer from 'react-jw-player'
import * as asb from './asb_smart_player'

function Index(){
	return (
		<div className='react-jw-player-container'>
			<ReactJWPlayer
				playerId='video_container'
				playerScript='https://content.jwplatform.com/libraries/OvarjY35.js'
				file='https://cdn.jwplayer.com/manifests/NQPPtd7P.m3u8'
				onReady={() => (asb.asb_smart_player_default('video_container',1096614))}
			/>
		</div>
	);
}

export default Index;