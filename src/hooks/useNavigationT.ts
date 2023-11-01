import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const useNavigationT = (): NativeStackNavigationProp<RootStackParamList> => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};

export const useBack = (customBackAction?: () => void) => {
  const navigation = useNavigationT();
  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        backToHome();
      }
    }
  };

  const backToHome = () => {
    navigation.reset({
      index: 1,
      routes: [{name: 'home'}],
    });
  };

  return {handleBack, backToHome};
};

export default useNavigationT;
