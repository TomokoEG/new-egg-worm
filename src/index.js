import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
// import OurJourney from "./pages/OurJourney";
// import DragonPage from "./pages/dragon/Dragon";
import reportWebVitals from "./reportWebVitals";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<I18nextProvider i18n={i18n}>
		<HomePage />
	</I18nextProvider>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your OurJourney, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
