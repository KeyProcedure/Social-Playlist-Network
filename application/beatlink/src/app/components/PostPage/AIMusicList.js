import React, { useState, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";

export function AIMusicList({ playlist }) {
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading && recommendations.length === 0) {
			fetchRecommendations(playlist.id)
				.then((recommendations) => {
					setRecommendations(recommendations.songRecommendations);
				})
				.catch((error) => {
					setError(error);
				});
		}
		return setLoading(false);
	}, [playlist.id]);

	return (
		<div>
			{recommendations.length > 0 && !loading ? (
				<ul>
					{recommendations.map((song) => (
						<li key={song.id}>
							{song.songName} by {song.artist}
						</li>
					))}
				</ul>
			) : (
				<Spinner animation="border" role="status" />
			)}
		</div>
	);
}

async function fetchRecommendations(playlistId) {
	const response = await fetch(`/api/songrecommendation/${playlistId}`);

	if (!response.ok) {
		throw new Error("Failed to fetch recommendations");
	}

	return response.json();
}
