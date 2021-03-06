import React from 'react';
import PropTypes from 'prop-types';
import ClickablePath from './clickable-path';
import SubroutineList from './subroutine-list';
import Parameters from './parameters';
import Ls from './ls';
import Error from './error';
import Success from './success';

import 'bootstrap/dist/css/bootstrap.css';
// import 'glyphicons/glyphicons';
// import logo from './logo.svg';
import './app.css';

const App = ({
  mystate,
  path,
  content,
  successAction,
  subroutine,
  subroutineError,
  subroutineParameters,
  getDirError,
  getRunError,
  running,
  subroutines,
  subroutineClick,
  changeParameter,
}) => (
  <div>
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </header>
    </div>
    <div className="container">
      <Success action={successAction}/>
      <Error message={subroutineError}/>
      <Error message={getDirError}/>
      <Error message={getRunError}/>
      {(subroutineParameters && (Object.keys(subroutineParameters).length !== 0))?
        <Parameters
          subroutine={subroutine}
          subroutineClick={subroutineClick}
          parameters={subroutineParameters}
          changeParameter={changeParameter}
        />
        :<div>
          <h3>Actions:</h3>
          <SubroutineList
            path={path}
            subroutineClick={subroutineClick}
            subroutines={subroutines}
          />
        </div>}
      <h3>Path:</h3>
      <h2><ClickablePath
        path={path}
      /></h2>
      <Ls
        items={content}
        callAction={subroutineClick}
      />
      <div>
        <h3>Running log:</h3>
        <ul>
          {Object.keys(running).map(k => (
            <li>
              {k}
              <br/>
	      <ul>
                {Object.keys(running[k]).map(k2 => (
                <li>
                  {k2}: {JSON.stringify(running[k][k2])}
                </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
    {mystate.subroutine.isFetching?
      <div id="cover"></div>
      :''
    }
  </div>
);

App.propTypes = {
  mystate: PropTypes.object,
  path: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  subroutine: PropTypes.string,
  getDirError: PropTypes.string,
  getRunError: PropTypes.string,
  running: PropTypes.object,
  subroutineError: PropTypes.string,
  subroutineParameters: PropTypes.object,
  subroutines: PropTypes.arrayOf(PropTypes.string).isRequired,
  successAction: PropTypes.string,
  subroutineClick: PropTypes.func.isRequired,
  changeParameter: PropTypes.func.isRequired,
};
export default App;
