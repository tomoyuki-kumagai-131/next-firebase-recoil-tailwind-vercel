import { RecoilRoot } from "recoil";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<RecoilRoot>
				<Header />
				<Component {...pageProps} />
			</RecoilRoot>
		</>
	);
}

export default MyApp;
