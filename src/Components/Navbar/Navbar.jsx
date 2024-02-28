import React from 'react';
import './Navbar.css';
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';
import uploadIcon from '../../assets/upload.png';
import moreIcon from '../../assets/more.png';
import notificationIcon from '../../assets/notification.png';
import profileIcon from '../../assets/jack.png';
import { Link } from 'react-router-dom';

const Navbar = ({ setSidebar }) => {
	return (
		<nav className='flex-div'>
			<div className='nav-left flex-div'>
				<img
					className='menu-icon'
					onClick={() => setSidebar((prev) => (prev === false ? true : false))}
					src={menuIcon}
					alt='menuIcon'
				/>
				<Link to='/'><img className='logo' src={logo} alt='logo' /></Link>
			</div>

			<div className='nav-middle flex-div'>
				<div className='search-box flex-div'>
					<input type='text' title='search' placeholder='Search' />
					<img src={search} title='search' alt='search' />
				</div>
			</div>

			<div className='nav-right flex-div'>
				<img src={uploadIcon} alt='uploadIcon' />
				<img src={moreIcon} alt='moreIcon' />
				<img src={notificationIcon} alt='notificationIcon' />
				<img className='user-icon' src={profileIcon} alt='profileIcon' />
			</div>
		</nav>
	);
};

export default Navbar;
