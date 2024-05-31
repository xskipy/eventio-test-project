import { Text as RNText, type TextProps as RNTextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'semiBold' | "bold" | 'subtitle' | 'link';
};

const Text = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: TextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <RNText
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'semiBold' ? styles.semiBold : undefined,
        type === 'bold' ? styles.bold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  semiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});

export default Text;