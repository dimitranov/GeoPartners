import React from "react";
import { Link, Switch } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import { useAppSession } from "./hooks/useAppSession";
import { mainRouteConfig } from "./routes/main";

function App() {
  useAppSession();

  return (
    <div className="App">
      <Header />

      <div className="content-wrapper">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/private">Private</Link>
        </nav>

        <Switch>
          {mainRouteConfig.map((rt) => (
            <rt.routeType exact key={rt.path} path={rt.path}>
              <rt.component />
            </rt.routeType>
          ))}
        </Switch>
      </div>
    </div>
  );
}

/**
 *
 * App Idea
 *
 * App for viewing and booking housings
 *
 * Type of users:
 *  Base User:
 *    UnLogged:
 *      View accomodations,
 *      Filter & Search by Type, Destination, Price,
 *      View reviews,
 *      Reserve accomodations for days and view price.
 *      See for the booked timespan and in general.
 *    Logged:
 *      -same as unlogged user,
 *      Write a review and give a rate on a accomodation offer,
 *      -- eventualy pay and get an ID/coupon for proof of payment and reservation
 *  Accomodator:
 *    -- Everything the normal user can do.
 *    Add new accomodation,
 *    Setup discounts for given periods or diferent type of rooms.
 *
 * SCREENS:
 * Signup
 * Login
 * Dashboard - (Big search component and Top rated acomodations, recent searches, suggestions)
 * ResultsViewPage - (page with search results, List of acomodation, filters )
 * AcomodationInsightsPage - (Info for an acomodation, change dates, see prices, see rooms)
 * AddAcomodationPage - (create/edit acomodation form, add images and info, setup discounts for date ranges)
 *
 *
 *
 *
 *
 *
 *
 *
 */

export default App;
