import React, { useState, useEffect } from 'react';
import { Navigator, Card } from './';

interface objectProps {
	map_url: string;
	id: number;
	origin_station_code: number;
	destination_station_code: number;
	date: string;
	state: string;
	city: string;
	station_path: Array<number>;
}

type AppProps = {
	data: Array<objectProps>;
};

interface navigatorState {
	nearestRides: boolean;
	upcomingRides: boolean;
	pastRides: boolean;
}

interface counterData {
	totalNearestRides: number;
	totalUpcomingRides: number;
	totalPastRides: number;
}

interface filterState {
	value: string;
	filterType: string;
}

const App = ({ data }: AppProps): JSX.Element => {
	const [navigator, setNavigator] = useState<navigatorState>({
		nearestRides: true,
		upcomingRides: false,
		pastRides: false,
	});
	const [filter, setFilter] = useState<boolean>(false);
	const [filterData, setFilterData] = useState<filterState>({
		value: '',
		filterType: '',
	});

	const [countData, setCountData] = useState<counterData>({
		totalNearestRides: 0,
		totalUpcomingRides: 0,
		totalPastRides: 0,
	});

	useEffect(() => {
		if (data) {
			console.log(data);
			const upcomingRides = data.filter(el => Date.now() < Date.parse(el.date));
			const pastRides = data.filter(el => Date.now() > Date.parse(el.date));
			console.log(upcomingRides.length);
			console.log('upcoming rides');

			setCountData({
				...countData,
				totalUpcomingRides: upcomingRides.length,
				totalPastRides: pastRides.length,
			});
		}
	}, [data]);

	const handleFilterCity = (filter: string) => {
		console.log('handle filter city');
		return data.map(el => {
			if (el.city === filter) {
				return (
					<Card
						key={el.id}
						imageLink={el.map_url}
						rideId={el.id}
						originStation={el.origin_station_code}
						date={el.date}
						sectionPath={el.station_path}
						city={el.city}
						state={el.state}
					/>
				);
			}
		});
	};
	const handleFilterState = (filter: string) => {
		return data.map(el => {
			if (el.state === filter) {
				return (
					<Card
						key={el.id}
						imageLink={el.map_url}
						rideId={el.id}
						originStation={el.origin_station_code}
						date={el.date}
						sectionPath={el.station_path}
						city={el.city}
						state={el.state}
					/>
				);
			}
		});
	};

	const handleSelectChange: Function = (type: string) => {
		return (event: React.ChangeEvent<HTMLSelectElement>) => {
			if (type === 'city') {
				setFilter(true);
				setFilterData({
					filterType: 'city',
					value: event.target.value,
				});
			}

			if (type === 'state') {
				setFilter(true);
				setFilterData({
					filterType: 'state',
					value: event.target.value,
				});
			}
		};
	};

	const handleNavigatorClick: Function = (type: string) => {
		return () => {
			if (type === 'nearestRide') {
				setNavigator({
					nearestRides: true,
					upcomingRides: false,
					pastRides: false,
				});
			}

			if (type === 'upcomingRides') {
				setNavigator({
					nearestRides: false,
					upcomingRides: true,
					pastRides: false,
				});
			}

			if (type === 'pastRides') {
				setNavigator({
					nearestRides: false,
					upcomingRides: false,
					pastRides: true,
				});
			}
		};
	};

	const nearesRideRender: any = () => {
		let counter = 0;
		let isUpdated = 0;
		const nearestRides = data.map((el, i) => {
			if (el.station_path) {
				return el.station_path.map(elstation => {
					const difference: any = Math.abs(40 - elstation);

					if (difference === 0 && isUpdated === 0) {
						isUpdated++;
						return (
							<Card
								key={el.id}
								imageLink={el.map_url}
								rideId={el.id}
								originStation={el.origin_station_code}
								date={el.date}
								sectionPath={el.station_path}
								city={el.city}
								state={el.state}
							/>
						);
					}

					if (difference === 1 && isUpdated === 0) {
						isUpdated++;
						return (
							<Card
								key={el.id}
								imageLink={el.map_url}
								rideId={el.id}
								originStation={el.origin_station_code}
								date={el.date}
								sectionPath={el.station_path}
								city={el.city}
								state={el.state}
							/>
						);
					}

					if (difference === 2 && isUpdated === 0) {
						isUpdated++;
						return (
							<Card
								key={el.id}
								imageLink={el.map_url}
								rideId={el.id}
								originStation={el.origin_station_code}
								date={el.date}
								sectionPath={el.station_path}
								city={el.city}
								state={el.state}
							/>
						);
					}

					isUpdated = 0;
				});
			}
		});

		return nearestRides;
	};

	const renderUpcomingRides: any = () => {
		let counter = 0;
		const futureRides = data.map((el, i) => {
			const currentDate = Date.now();
			const dateInData = Date.parse(el.date);
			if (currentDate < dateInData) {
				counter++;

				return (
					<Card
						key={el.id}
						imageLink={el.map_url}
						rideId={el.id}
						originStation={el.origin_station_code}
						date={el.date}
						sectionPath={el.station_path}
						city={el.city}
						state={el.state}
					/>
				);
			}
		});

		return futureRides;
	};

	const renderPastRides: any = () => {
		let counter: number = 0;
		const pastRides = data.map((el, i) => {
			const currentDate = Date.now();
			const dateInData = Date.parse(el.date);
			if (currentDate > dateInData) {
				counter++;
				return (
					<Card
						key={el.id}
						imageLink={el.map_url}
						rideId={el.id}
						originStation={el.origin_station_code}
						date={el.date}
						sectionPath={el.station_path}
						city={el.city}
						state={el.state}
					/>
				);
			}
		});

		return pastRides;
	};

	const renderNavigately: any = (): any => {
		if (filter) {
			console.log('filter state true');
			console.log(filterData);
			if (filterData.filterType === 'city') {
				return handleFilterCity(filterData.value);
			}

			if (filterData.filterType === 'state') {
				return handleFilterState(filterData.value);
			}
		}
		if (navigator.nearestRides) {
			return nearesRideRender();
		}

		if (navigator.upcomingRides) {
			return renderUpcomingRides();
		}

		if (navigator.pastRides) {
			return renderPastRides();
		}
	};

	return (
		<div className='container mx-auto overflow-y-scroll h-screen '>
			<Navigator
				data={data}
				counters={countData}
				navigator={navigator}
				handleNavigatorClick={handleNavigatorClick}
				handleSelectChange={handleSelectChange}
			/>
			<div className='flex flex-col px-10 py-5 gap-5 '>{renderNavigately()}</div>
		</div>
	);
};

export default App;
