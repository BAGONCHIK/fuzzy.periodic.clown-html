import 'styles/reset.scss';
import 'styles/globals.scss';
import 'styles/fonts.scss';
import 'styles/vars.scss';
import useCalcVh from 'hooks/useCalcVh';

function MyApp({ Component, pageProps }) {
  useCalcVh();

  return <Component {...pageProps} />;
}

export default MyApp;
