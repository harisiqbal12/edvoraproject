import React, { useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Select from 'react-select';

type NavigatorProps = {
	navigator: navigatorState;
	handleNavigatorClick: any;
	counters: any;
	data: Array<objectProps>;
	handleSelectChange: Function;
};

interface navigatorState {
	nearestRides: boolean;
	upcomingRides: boolean;
	pastRides: boolean;
}

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

const Navigator = ({
	navigator,
	handleNavigatorClick,
	counters,
	data,
	handleSelectChange,
}: NavigatorProps): JSX.Element => {
	const [showDropDown, setShowDropdown] = useState<boolean>(false);

	// const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	// 	console.log(event.target.value);
	// 	filterByCity('city', event.target.value);
	// };

	// const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

	return (
		<div className='container mx-auto bg-background'>
			<div className='flex justify-between items-center'>
				<div className='px-10 py-5 flex gap-10'>
					<h2
						onClick={handleNavigatorClick('nearestRide')}
						className={`navigator ${
							navigator.nearestRides ? 'text-white text-bold border-b-2' : ''
						} `}>
						Nearest rides
					</h2>
					<h2
						onClick={handleNavigatorClick('upcomingRides')}
						className={`navigator ${
							navigator.upcomingRides ? 'text-white text-bold border-b-2' : ''
						} `}>
						Upcoming rides ( {counters.totalUpcomingRides} )
					</h2>
					<h2
						onClick={handleNavigatorClick('pastRides')}
						className={`navigator ${
							navigator.pastRides ? 'text-white text-bold border-b-2' : ''
						} `}>
						Past rides ( {counters.totalPastRides} )
					</h2>
				</div>

				<div className=''>
					<div
						onClick={() => setShowDropdown(!showDropDown)}
						className='flex gap-2 cursor-pointer'>
						<BsFilterLeft
							size={24}
							className='text-gray-300 hover:text-gray-100'
						/>
						<h2 className='text-gray-300 hover:text-gray-100 mr-10'>Filters</h2>
					</div>

					{showDropDown ? (
						<motion.div
							animate={{ y: 10 }}
							transition={{ ease: 'easeOut', duration: 0.2 }}
							className='relative'>
							<div className='w-40 h-28 bg-header border rounded-lg 100 absolute right-10'>
								<div className='flex flex-col items-center py-2'>
									<h2 className='text-gray-100 text-xs border-b select-none '>
										Filters
									</h2>

									<select
										onChange={handleSelectChange('city')}
										className='bg-background text-white text-xs  outline-none mt-2 px-4 py-1 rounded-md  w-32'>
										<option value=''>City</option>
										{data.map((el, i) => (
											<>
												<option key={el.city + i} value={el.city}>
													{el.city}
												</option>
											</>
										))}
									</select>
									<select
										onChange={handleSelectChange('state')}
										className='bg-background text-white text-xs  outline-none mt-2 px-4 py-1 rounded-md  w-32'>
										<option value=''>State</option>
										{data.map((el, i) => (
											<>
												<option key={el.state + i} value={el.state}>
													{el.state}
												</option>
											</>
										))}
									</select>
								</div>
							</div>
						</motion.div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default Navigator;
