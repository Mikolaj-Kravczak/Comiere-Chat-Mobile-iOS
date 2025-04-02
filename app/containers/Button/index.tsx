import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useTheme } from '../../theme';
import sharedStyles from '../../views/Styles';
import ActivityIndicator from '../ActivityIndicator';

interface IButtonProps extends TouchableOpacityProps {
	title: string;
	onPress: () => void;
	type?: 'primary' | 'secondary';
	backgroundColor?: string;
	loading?: boolean;
	color?: string;
	fontSize?: number;
	style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
	styleText?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
	small?: boolean;
	pressedStyle?: StyleProp<ViewStyle>;
	pressedTextStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 12,
		borderRadius: 4
	},
	normalButton: {
		paddingHorizontal: 14,
		justifyContent: 'center',
		height: 48
	},
	smallButton: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		alignSelf: 'center'
	},
	text: {
		...sharedStyles.textMedium,
		...sharedStyles.textAlignCenter
	},
	smallText: {
		...sharedStyles.textBold,
		fontSize: 12,
		lineHeight: 18
	},
	disabled: {
		opacity: 1
	},
	disabledText: {
		opacity: 1
	}
});

const Button: React.FC<IButtonProps> = ({
	type = 'primary',
	disabled,
	loading,
	fontSize = 16,
	title,
	onPress,
	backgroundColor,
	color,
	style,
	styleText,
	small,
	pressedStyle,
	pressedTextStyle,
	...otherProps
}) => {
	const { colors } = useTheme();
	const isPrimary = type === 'primary';
	const isDisabled = disabled || loading;
	const [isPressed, setIsPressed] = useState(false);

	const defaultBackgroundColor = isPrimary ? colors.buttonBackgroundPrimaryDefault : colors.buttonBackgroundSecondaryDefault;
	const disabledBackgroundColor = isPrimary ? colors.buttonBackgroundPrimaryDisabled : colors.buttonBackgroundSecondaryDisabled;

	const resolvedBackgroundColor = backgroundColor || defaultBackgroundColor;
	const resolvedTextColor = color || (isPrimary ? colors.fontWhite : colors.fontDefault);

	const containerStyle = [
		small ? styles.smallButton : styles.normalButton,
		styles.container,
		{ backgroundColor: isDisabled ? disabledBackgroundColor : resolvedBackgroundColor },
		isDisabled && backgroundColor ? styles.disabled : {},
		style
	];

	const textStyle = [
		{ color: isDisabled ? colors.buttonPrimaryDisabled : resolvedTextColor, fontSize },
		small ? styles.smallText : styles.text,
		styleText
	];

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isDisabled}
			style={[
				containerStyle,
				isPressed && pressedStyle,
				isDisabled && styles.disabled
			]}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			accessibilityLabel={title}
			accessibilityRole='button'
			{...otherProps}>
			{loading ? <ActivityIndicator color={resolvedTextColor} /> : (
				<Text style={[
					textStyle,
					isPressed && pressedTextStyle,
					isDisabled && styles.disabledText
				]}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default Button;
