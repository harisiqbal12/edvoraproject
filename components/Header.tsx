import React from 'react';
import Image from 'next/image';

import ProfileImage from '../assets/images/profileimage.jpg';

type HeaderProps = {};

const Header = ({}: HeaderProps): JSX.Element => {
	return (
		<div className='container mx-auto bg-header'>
			<div className='container flex h-14 items-center px-10 justify-between '>
				<h2 className='text-white font-bold text-xl'>Edvora</h2>
				<div className='flex items-center gap-4 '>
					<h2 className='text-white'>Haris Iqbal</h2>
					<Image
						src={ProfileImage}
						alt='profile-image'
						height={40}
						width={40}
						className='rounded-full object-cover '
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
