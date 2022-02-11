import {BrowserRouter, Route, Switch} from "react-router-dom"
import Coin from "./Coin"
import Coins from "./Coins";

interface IRouterProps {
  toggleDark:() =>void;
  isDark:boolean;
}
const Router = ({toggleDark, isDark}:IRouterProps) =>{
  return(
    <>
    <BrowserRouter>
    <Switch>
      <Route path="/:coinId">
        <Coin isDark={isDark} /> 
      </Route>
      <Route path="/">
        <Coins toggleDark={toggleDark} />
      </Route>
    </Switch>
    </BrowserRouter>
    </>
  )
}

export default Router;