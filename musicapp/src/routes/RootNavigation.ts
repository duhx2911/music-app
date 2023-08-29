import {createNavigationContainerRef} from '@react-navigation/native';
type navigationType = {
  name: string;
  param: object;
};
export const navigationRef = createNavigationContainerRef<navigationType>();

export const navigate = (name: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
};
