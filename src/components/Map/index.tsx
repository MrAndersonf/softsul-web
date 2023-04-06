import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { CircularProgress } from '@mui/material';
export interface IMap {
	lat: string | undefined;
	lng: string | undefined;
	company: string | undefined;
}

export const Map = ({ lat, lng, company }: IMap) => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const loader = new Loader({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
		version: 'weekly',
		libraries: ['places'],
	});

	const contentString =
		'<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h1 id="firstHeading" class="firstHeading">' +
			company ===
		undefined
			? ''
			: company +
			  '</h1>' +
			  '<div id="bodyContent">' +
			  '<p>' +
			  '</div>' +
			  '</div>';

	useEffect(() => {
		if (lat === undefined || lng === undefined) return;
		const mapOptions = {
			center: {
				lat: parseFloat(lat),
				lng: parseFloat(lng),
			},
			zoom: 18,
			fullscreenControl: true,
			mapTypeControl: true,
			streetViewControl: true,
			zoomControl: true,
		};
		const element = document.getElementById('map');
		loader
			.load()
			.then(google => {
				const mapp = new google.maps.Map(element, mapOptions);
				const marker = new google.maps.Marker({
					position: {
						lat: parseFloat(lat),
						lng: parseFloat(lng),
					},
					animation: google.maps.Animation.DROP,
					map: mapp,
					title: 'Centropool',
				});
				const infowindow = new google.maps.InfoWindow({
					content: contentString,
					ariaLabel: 'Centropool',
				});
				marker.addListener('click', () => {
					infowindow.open({
						anchor: marker,
						mapp,
					});
				});
			})
			.catch(e => {
				console.error(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [lat, lng]);
	return (
		<div
			id="map"
			style={{
				width: '100%',
				height: '90vh',
				backgroundColor: '#212529',
			}}
		>
			<CircularProgress />
		</div>
	);
};
