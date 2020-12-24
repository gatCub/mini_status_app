import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import './Intro.css';

const osName = platform();

const Intro = ({ id, snackbarError, fetchedUser, userHasSeenIntro, go }) => {
	return (
		<Panel id={id} centered={true}>
			<PanelHeader>
				Замена статуса
			</PanelHeader>
			{(!userHasSeenIntro && fetchedUser) && 
				<Fragment>
					<Group>
						<Div className='User'>
							{fetchedUser.photo_200 && 
							<Avatar src={fetchedUser.photo_200}/>}
						</Div>
					</Group>
				</Fragment>
			}
			{snackbarError}
		</Panel>
	)
};

Intro.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Intro;
