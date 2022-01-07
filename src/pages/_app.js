import { RecoilRoot } from "recoil";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<AuthProvider>
				<RecoilRoot>
					<Header />
					<Component {...pageProps} />
				</RecoilRoot>
			</AuthProvider>
		</>
	);
}

export default MyApp;
