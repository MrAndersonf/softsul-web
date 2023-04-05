import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { CircularProgress } from '@mui/material';
export interface IMap {
	lat: string | undefined;
	lng: string | undefined;
}

export const Map = ({ lat, lng }: IMap) => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const loader = new Loader({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		version: 'weekly',
		libraries: ['places'],
	});

	const contentString =
		'<div id="content">' +
		'<div id="siteNotice">' +
		'</div>' +
		'<h1 id="firstHeading" class="firstHeading">Centropool</h1>' +
		'<div id="bodyContent">' +
		'<p><b>Centropool Assessoria em Agronegócios</b>, está localizada na Rua Arnaldo ' +
		'Estevão de Figueiredo, 164 - Centro, Rondonópolis - MT. <br />' +
		+'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
		'south west of the nearest large town, Alice Springs; 450&#160;km ' +
		'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
		'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
		'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
		'Aboriginal people of the area. It has many springs, waterholes, ' +
		'rock caves and ancient paintings. Uluru is listed as a World ' +
		'Heritage Site.</p>' +
		'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
		'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
		'(last visited June 22, 2009).</p>' +
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
