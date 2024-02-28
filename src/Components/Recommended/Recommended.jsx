import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Recommended = ({ categoryId }) => {
	const [apiData, setApiData] = useState([]);
	const fetchRecommendedData = async () => {
		const recommendedData_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
		await fetch(recommendedData_URL)
			.then((response) => response.json())
			.then((data) => setApiData(data.items));
	};

	useEffect(() => {
		fetchRecommendedData();
	}, []);

	return (
		<div className='recommended'>
			{apiData.map((item, index) => {
				return (
					<div key={index} className='side-video-list'>
						<img src={item.snippet.thumbnails.medium.url} alt='sidevideo' />
						<div className='vid-info'>
							<h4>{item.snippet.title}</h4>
							<p>{item.snippet.channelTitle}</p>
							<p>
								{value_converter(item.statistics.viewCount)} Views &bull;{' '}
								{moment(item.snippet.publishedAt).fromNow()}
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Recommended;
