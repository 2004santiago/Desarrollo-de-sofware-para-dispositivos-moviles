import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import GeolocationPage from "./pages/Geolocation";
import CameraPage from "./pages/Camera";
import AccelerometerPage from "./pages/Accelerometer";
import DevicePage from "./pages/Device";
import HapticsPage from "./pages/Haptics";
import FilesystemPage from "./pages/Filesystem";
import LocalNotificationsPage from "./pages/LocalNotifications";
import PushNotificationsPage from "./pages/PushNotifications";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home"><Home /></Route>
          <Route exact path="/geolocation"><GeolocationPage /></Route>
          <Route exact path="/camera"><CameraPage /></Route>
          <Route exact path="/accelerometer"><AccelerometerPage /></Route>
          <Route exact path="/device"><DevicePage /></Route>
          <Route exact path="/haptics"><HapticsPage /></Route>
          <Route exact path="/filesystem"><FilesystemPage /></Route>
          <Route exact path="/local-notifications"><LocalNotificationsPage /></Route>
          <Route exact path="/push-notifications"><PushNotificationsPage /></Route>
          <Route exact path="/"><Redirect to="/home" /></Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
