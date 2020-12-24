import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import './Intro.css';

const osName = platform();

const Intro = ({ id, snackbarError, fetchedUser, userHasSeenIntro, go }) => {
	return (
		<Panel id={id} centered={true}>
			<PanelHeader>
				Замена статуса
			</PanelHeader>
			{(!userHasSeenIntro && fetchedUser) && 'Hello Word!'}
			{snackbarError}
		</Panel>
	)
};

Intro.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Intro;
