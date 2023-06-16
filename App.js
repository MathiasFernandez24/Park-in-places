import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';
import { store } from './src/store';
import { init } from './src/db';

export default function App() {
  init()
    .then(() => { console.log("OK -Db ok desde App") })
    .catch((err) => {
      console.log("Error Db desde App")
      console.log(err)
    })


  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}