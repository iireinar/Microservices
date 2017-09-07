import { AppConf } from './app.conf';

export function loadConf(appConf:AppConf){
  return () => appConf.load();
}
