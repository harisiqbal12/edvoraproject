import React from 'react';
import { Header, Navigator } from './';

type LayoutProps = {
	children: JSX.Element;
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default Layout;
