import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router";

import Login from "../pages";
import Home from "../pages/home";
import Settings from "../pages/settings";
import Finances from "../pages/finances";
import Schedule from "../pages/schedule";

export default function () {
	return (
		<Routes>
			<Route element={<Login />} path={"/"} />
			<Route element={<Home />} path={"/home"} />
			<Route element={<Schedule />} path={"/schedule"} />
			<Route element={<Finances />} path={"/finances"} />
			<Route element={<Settings />} path={"/settings"} />
		</Routes>
	);
}
