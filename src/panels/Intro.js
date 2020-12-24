import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Button } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout';

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
							<h2> Привет, {fetchedUser.first_name}!</h2>
							<h3> Здесь ты можешь выбрать и установить себе статус</h3>
							
						</Div>
					</Group>
					<FixedLayout vertical='bottom'>
							<Div>
								<Button mode='commerce' size='xl' onClick={go}>
									Вперед
								</Button>
							</Div>
					</FixedLayout>
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
