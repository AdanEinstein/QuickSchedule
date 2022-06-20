import * as React from "react";

import Layout from "../components/layout/Layout";

const Home: React.FC = () => {
	return (
		<Layout menu>
			<div className="container h-100 d-flex justify-content-center align-items-center text-light">
                <h1>Olá, bem vindo ao Quick Schedule</h1>
			</div>
		</Layout>
	);
};

export default Home;
