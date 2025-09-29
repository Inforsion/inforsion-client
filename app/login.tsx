import { Image } from 'expo-image';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoTextColor from '@/assets/images/inforsion-logo-text-color.png';
import { Button } from '@/src/components/common/button/Button';
import CommonInput from '@/src/components/common/input/CommonInput';
import { Colors } from '@/src/constants/Colors';
import { useState } from 'react';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={LogoTextColor} />
        <Text style={styles.logoText}>더욱 쉽고 간편한 가게 관리</Text>
      </View>
      <Text style={styles.title}>{isLogin ? '로그인' : '회원가입'}</Text>
      <View style={styles.inputsContainer}>
        <CommonInput placeholder="아이디" type={'text'} />
        <CommonInput placeholder="비밀번호" type={'password'} />
      </View>
      <Text style={styles.forgotPasswordText}>비밀번호를 잃어버리셨나요?</Text>
      <Button
        title={isLogin ? '로그인' : '회원가입'}
        onPress={() => {}}
        style={styles.loginOrSignupButton}
      />
      <View>
        <Text style={styles.signupPromptText}>
          회원이 아니신가요? <Text style={styles.signupText}>회원가입하기</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const useStyles = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'] || Colors.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingVertical: 80,
      paddingHorizontal: 24,
      backgroundColor: colors.background.primary,
      alignContent: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80,
    },
    logo: {
      width: 180,
      height: 40,
      objectFit: 'cover',
      marginBottom: 4,
    },
    logoText: {
      fontWeight: 700,
      fontSize: 12,
    },
    title: {
      padding: 4,
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: 1,
    },
    input: {
      borderRadius: 12,
      flex: 1,
    },
    inputsContainer: {
      flexDirection: 'column',
      gap: 8,
      paddingVertical: 6,
    },
    forgotPasswordText: {
      fontSize: 12,
      color: colors.tabIconSelected,
      textAlign: 'left',
      marginTop: 8,
      fontWeight: '600',
    },
    loginOrSignupButton: {
      height: 48,
      marginTop: 24,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.primary['300'],
    },
    signupPromptText: {
      fontSize: 14,
      color: '#72727A',
      textAlign: 'center',
      marginTop: 16,
    },
    signupText: {
      marginTop: 16,
      fontSize: 14,
      color: colors.tabIconSelected,
      fontWeight: '600',
    },
  });

  return styles;
};

export default LoginScreen;
