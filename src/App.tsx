import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import GeolocationPage from "./pages/Geolocation";
import CameraPage from "./pages/Camera";
import AccelerometerPage from "./pages/Accelerometer";
import DevicePage from "./pages/Device";
import HapticsPage from "./pages/Haptics";
import FilesystemPage from "./pages/Filesystem";
import LocalNotificationsPage from "./pages/LocalNotifications";
import PushNotificationsPage from "./pages/PushNotifications";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
