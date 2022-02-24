import React from 'react';
import Image from 'next/image';

type CardProps = {
	imageLink: string;
	rideId: number;
	originStation: number;
	date: string;
	sectionPath: Array<number>;
	city: string;
	state: string;
};

const Card = ({
	imageLink,
	rideId,
	originStation,
	date,
	sectionPath,
	city,
	state,
}: CardProps): JSX.Element => {
	const renderSectionPath = () => {
		if (sectionPath) {
			return sectionPath.map((el, i) => {
				if (sectionPath.length === i + 1) {
					return el;
				}
				return `${el}, `;
			});
		}
	};
	return (
		<div className='container w-screen'>
			<div className='flex justify-between bg-cardbg h-56 mr-20 rounded-lg'>
				<div className='flex'>
					<div className=' px-10 py-8 '>
						<Image
							src={`https://picsum.photos/${rideId}`}
							alt='map-url'
							height={160}
							width={300}
							className='rounded-lg'
						/>
					</div>
					<div className='flex flex-col py-10 gap-2'>
						<div className='flex gap-4 text-sm'>
							<h2 className=' text-gray-300'>Ride Id</h2>
							<h2 className='text-white text-bold'>{rideId}</h2>
						</div>
						<div className='flex gap-4 text-sm'>
							<h2 className=' text-gray-300'>Origin Station</h2>
							<h2 className='text-white text-bold'>{originStation}</h2>
						</div>
						<div className='flex gap-4 text-sm'>
							<h2 className=' text-gray-300'>Station Path</h2>
							<h2 className='text-white text-bold'>[{renderSectionPath()}]</h2>
						</div>
						<div className='flex gap-4 text-sm'>
							<h2 className=' text-gray-300'>Date</h2>
							<h2 className='text-white text-bold'>{date}</h2>
						</div>
						<div className='flex gap-4 text-sm'>
							<h2 className=' text-gray-300'>Distance</h2>
							<h2 className='text-white text-bold'>20</h2>
						</div>
					</div>
				</div>
				<div className='flex p-5 px-10 gap-4'>
					<div className='bg-header h-7 rounded-xl'>
						<h2 className='text-white px-5'>{city}</h2>
					</div>
					<div className='bg-header h-7 rounded-xl'>
						<h2 className='text-white px-5'>{state}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
