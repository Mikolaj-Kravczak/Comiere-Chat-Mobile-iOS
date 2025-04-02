import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import { Linking } from 'react-native';
import sharedStyles from '../views/Styles';
import { useTheme } from '../theme';
import openLink from '../lib/methods/helpers/openLink';
import { useAppSelector } from '../lib/hooks';
import I18n from '../i18n';

const styles = StyleSheet.create({
	bottomContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 32,
		marginHorizontal: 30
	},
	bottomContainerText: {
		...sharedStyles.textMedium,
		fontSize: 14,
		lineHeight: 22,
		textAlign: 'center'
	},
	bottomContainerTextUnderline: {
		textDecorationLine: 'underline'
	}
});
const UGCRules = ({ styleContainer }: { styleContainer?: ViewStyle }) => {
	const { colors, theme } = useTheme();

	const handlePrivacyClick = () => {
		Linking.openURL('https://comiere.com/privacy-policy/');
	};

	const handleTermsClick = () => {
		Linking.openURL('https://comiere.com/term_condition/');
	};

	return (
		<View style={[styles.bottomContainer, styleContainer]}>
			<Text style={[styles.bottomContainerText, { color: colors.fontSecondaryInfo }]}>{I18n.t('Onboarding_agree_terms')}</Text>
			<Text
				style={[styles.bottomContainerTextUnderline, styles.bottomContainerText, { color: colors.fontInfo }]}
				onPress={handleTermsClick}>
				{/* {I18n.t('Terms & Conditions')} */}
				Terms & Conditions
			</Text>
			<Text
				style={[styles.bottomContainerTextUnderline, styles.bottomContainerText, { color: colors.fontInfo }]}
				onPress={handlePrivacyClick}>
				{/* {I18n.t('Privacy Policy')} */}
				Privacy Policy
			</Text>
		</View>
	);
};
export default UGCRules;
