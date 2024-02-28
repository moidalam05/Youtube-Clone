import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
	const { videoId } = useParams();
	const [apiData, setApiData] = useState(null);
	const [channelData, setChannelData] = useState(null);
	const [commentData, setCommentData] = useState([]);

	const fetchVideoData = async () => {
		// Fetching videos data
		const videoDetails_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;
		await fetch(videoDetails_URL)
			.then((res) => res.json())
			.then((data) => setApiData(data.items[0]));
	};

	const fetchChannelData = async () => {
		const channelDetails_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
		await fetch(channelDetails_URL)
			.then((res) => res.json())
			.then((data) => setChannelData(data.items[0]));

		const commentData_URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
		await fetch(commentData_URL)
			.then((res) => res.json())
			.then((data) => setCommentData(data.items));
	};

	useEffect(() => {
		fetchVideoData();
	}, [videoId]);

	useEffect(() => {
		fetchChannelData();
	}, [apiData]);

	return (
		<div className='play-video'>
			<iframe
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
			></iframe>
			<h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>
			<div className='play-video-info'>
				<p>
					{value_converter(apiData ? apiData.statistics.viewCount : '1M')} views
					&bull;{' '}
					{moment(
						apiData ? apiData.snippet.publishedAt : '1 day ago'
					).fromNow()}
				</p>
				<div>
					<span>
						<img src={like} alt='Like' />
						{value_converter(apiData ? apiData.statistics.likeCount : '100K')}
					</span>
					<span>
						<img src={dislike} alt='Dislike' />
					</span>
					<span>
						<img src={share} alt='Dislike' />
						Share
					</span>
					<span>
						<img src={save} alt='Dislike' />
						Save
					</span>
				</div>
			</div>
			<hr />
			<div className='publisher'>
				<img
					src={channelData ? channelData.snippet.thumbnails.default.url : ''}
					alt='user-image'
				/>
				<div>
					<p>{apiData ? apiData.snippet.channelTitle : 'Publisher Name'}</p>
					<span>
						{value_converter(
							channelData ? channelData.statistics.subscriberCount : '1M'
						)}{' '}
						Subscriber
					</span>
				</div>
				<button>Subscribe</button>
			</div>
			<div className='vid-description'>
				<p>
					{apiData ? apiData.snippet.description : 'this is the description'}
				</p>
				<hr />
				<h4>
					{value_converter(apiData ? apiData.statistics.commentCount : '11K')}{' '}
					Comments
				</h4>

				{commentData.map((item, index) => {
					return (
						<div key={index} className='comment'>
							<img
								src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
								alt='userprofile'
							/>
							<div>
								<h3>
									{item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
									<span>
										{moment(
											item.snippet.topLevelComment.snippet.publishedAt
										).fromNow()}
									</span>
								</h3>
								<p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
								<div className='comment-action'>
									<img src={like} alt='Like' />
									<span>
										{value_converter(
											item.snippet.topLevelComment.snippet.likeCount
										)}
									</span>
									<img src={dislike} alt='dislike' />
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PlayVideo;
