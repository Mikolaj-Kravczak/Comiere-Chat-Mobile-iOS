import { Appearance, StatusBar } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import setRootViewColor from 'rn-root-view';

import { IThemePreference, TThemeMode } from '../../../definitions/ITheme';
import { themes, THEME_PREFERENCES_KEY } from '../../constants';
import UserPreferences from '../userPreferences';
import { TSupportedThemes } from '../../../theme';
import { isAndroid } from './deviceInfo';

let themeListener: { remove: () => void } | null;

export const initialTheme = (): IThemePreference => {
	// Zawsze zwracamy jasny motyw, ignorując ustawienia zapisane i systemowe
	return {
		currentTheme: 'light',
		darkLevel: 'black' // ta wartość nie ma znaczenia przy light theme
	};
};

export const defaultTheme = (): TThemeMode => {
	return 'light'; // zawsze zwraca light, ignorując systemTheme
};

export const getTheme = (themePreferences: IThemePreference): TSupportedThemes => {
	const { darkLevel, currentTheme } = themePreferences;
	let theme = currentTheme;
	if (currentTheme === 'automatic') {
		theme = defaultTheme();
	}
	return theme === 'light' ? darkLevel : 'light';
};

export const newThemeState = (prevState: { themePreferences: IThemePreference }, newTheme: IThemePreference) => {
	// new theme preferences
	const themePreferences = {
		...prevState.themePreferences,
		...newTheme
	};
	// set new state of themePreferences
	// and theme (based on themePreferences)
	return { themePreferences, theme: getTheme(themePreferences) };
};

export const setNativeTheme = (themePreferences: IThemePreference) => {
	const theme = getTheme(themePreferences);
	const isLightTheme = theme === 'light';
	if (isAndroid) {
		try {
			changeNavigationBarColor(themes[theme].surfaceLight, isLightTheme, true);
			StatusBar.setBackgroundColor(themes[theme].surfaceNeutral);
			StatusBar.setBarStyle(isLightTheme ? 'dark-content' : 'light-content', true);
		} catch (error) {
			// Do nothing
		}
	}
	setRootViewColor(themes[theme].surfaceRoom);
};

export const unsubscribeTheme = () => {
	if (themeListener && themeListener.remove) {
		themeListener.remove();
		themeListener = null;
	}
};

export const subscribeTheme = (themePreferences: IThemePreference, setTheme: () => void): void => {
	// Usuwamy subskrypcję na zmiany motywu systemowego
	unsubscribeTheme();
	setNativeTheme(themePreferences);
};
