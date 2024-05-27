import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId={CLIENT_ID}>
		<RecoilRoot>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</RecoilRoot>
	</GoogleOAuthProvider>
);
