import React from "react";
import { Route } from "react-router-dom";

import Menu from "./Menu";
import Welcome from "../Welcome";
import Client from "../clients/Client";
import FindClient from "../clients/FindClient";
import Cloth from "../cloth/Cloth";
import Rental from "../rental/Rental";
import RentalList from "../rental/RentalList";
import Quotation from "../quotation/quotation";
import UniformMale from "../uniforms/dairy_male/UniformMale";
import UniformFemale from "../uniforms/dairy_female/UniformFemale";
import UniformSport from "../uniforms/sport/UniformSport";
import Endpoints from "../common/Endpoints";

const Rutas = () => {
  return (
    <Menu>
      <div>
        <Route exact path="/" component={Welcome} />{" "}
        <Route exact path="/clients" component={Client} />{" "}
        <Route exact path="/clients/find" component={FindClient} />{" "}
        <Route exact path="/cloth" component={Cloth} />{" "}
        <Route exact path="/rental" component={Rental} />{" "}
        <Route exact path="/rental/list" component={RentalList} />{" "}
        <Route exact path="/quotation" component={Quotation} />
        <Route exact path="/uniform_male" component={UniformMale} />
        <Route exact path="/uniform_female" component={UniformFemale} />
        <Route exact path="/uniform_sport" component={UniformSport} />
        <Route exact path="/endpoints" component={Endpoints} />
      </div>
    </Menu>
  );
};
export default Rutas;
