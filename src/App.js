import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Intro from './panels/Intro';

const ROUTES = {
	HOME: 'home',
	INTRO: 'intro'
};

const STOREGE_KEYS = {
	STATUS: 'status',
}

const App = () => {
	const [activePanel, setActivePanel] = useState(ROUTES.INTRO);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
	const [snackbar, setSnackbar] = useState(false);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageData = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS)
			});
			console.log(storageData);
			const data = {};
			storageData.keys.forEach( ({ key, value }) => {
				try {
					data[key] = value ? JSON.parse(value) : {};
					switch(key){
						case STORAGE_KEYS.STATUS:
							if (data[key].hasSeenIntro){
								setActivePanel(ROUTES.HOME);
								setUserHasSeenIntro(true); 
							}
							break;
						default: 
							break;
					}
				} catch(error){
					setSnackbar(<Snackbar
							layaut='vertical'
							onClose={() => setSnackbar(null)}
							before={<Avatar size={24} 
							style={{backgroundColor: 'var(--dynamic-red)'}}> 
								<Icon24Error fill='#fff' width='14' height='14'/>
							</Avatar>}
							duration={1000}>
								Проблема с получением данных из Storage
							</Snackbar>)
					console.log(error);
				}
			})
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const viewIntro = async function () {
		try {
			await bridge.send('VKWebAppStorageSet', {
				key: STOREGE_KEYS,
				value: JSON.stringify({
					hasSeenIntro: true
				})
			})
		 } catch (error) {
			setSnackbar(<Snackbar
				layaut='vertical'
				onClose={() => setSnackbar(null)}
				before={<Avatar size={24} 
				style={{backgroundColor: 'var(--dynamic-red)'}}> 
					<Icon24Error fill='#fff' width='14' height='14'/>
				</Avatar>}
				duration={1000}>
					Проблема с отправкой данных  Storage
				</Snackbar>)
		console.log(error);
		}
	}
	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id={ROUTES.HOME} fetchedUser={fetchedUser} go={go} snackbarError={snackbar}/>
			<Intro id={ROUTES.INTRO} go={go} snackbarError={snackbar}/>
		</View>
	);
}

export default App;

