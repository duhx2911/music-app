import {NavigationContainer} from '@react-navigation/native';
import DrawerRoute from './drawer/Drawer';

const MainRouter = () => {
  return (
    <NavigationContainer>
      <DrawerRoute />
    </NavigationContainer>
  );
};

export default MainRouter;
