import * as React from "react";

import Layout from "../components/layout/Layout";
import FormLogin from "../components/login/FormLogin";

const App: React.FC = () => {
	return (
		<Layout>
			<div className="container h-100 d-flex justify-content-center align-items-center">
				<FormLogin />
			</div>
		</Layout>
	);
};

export default App;
