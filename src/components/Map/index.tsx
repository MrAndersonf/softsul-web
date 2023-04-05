import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import Snack from 'components/Snack';
import Head from 'next/head';

import styles from '../../styles/Home.module.css';
import { Loader } from '@googlemaps/js-api-loader';

export const Map = () => {
	const router = useRouter();
	const loader = new Loader({
		apiKey: 'AIzaSyBqDZIerP29cEU5aDDEYACze2c96bTF0ZE',
		version: 'weekly',
		libraries: ['places'],
	});

	const mapOptions = {
		center: {
			lat: -16.47253,
			lng: -54.62967,
		},
		zoom: 18,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		zoomControl: false,
	};

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
		loader
			.load()
			.then(google => {
				const mapp = new google.maps.Map(
					document.getElementById('map'),
					mapOptions,
				);
				const marker = new google.maps.Marker({
					position: {
						lat: -16.47253,
						lng: -54.62967,
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
				Snack.error('Erro ao carregar mapa ' + e.message);
			});
	}, []);
	return (
		<div
			id="map"
			style={{
				display: 'flex',
				width: 700,
				height: 415,
				backgroundColor: '#212529',
			}}
		></div>
	);
};
