import { hot } from 'react-hot-loader/root'
import React from 'react'

import FullEditor from './FullEditorDemo'
import ControllsInPortal from './ControllsInPortalDemo'
import EditorWithAds from './EditorWithAdsDemo'
import EditorWithAds2 from './EditorWithAdsDemo2'

import DropdownTest from './DropdownTestDemo'


export const App = hot(() => (
  <React.Fragment>
    <div className="demo_wrapper">
      <div className="header">
        <h1>
          Simple Editor Demo
        </h1>
        <i>
          Just try typing some text in editor
        </i>
      </div>

      <div className="item-header">
        <h3>FullEditor</h3>
      </div>
      <FullEditor />

      <h3>ControllsInPortal</h3>
      <ControllsInPortal />

      <h3>EditorWithAds</h3>
      <EditorWithAds />

      <h3>EditorWithAds2</h3>
      <EditorWithAds2 />

      <hr />

      <h3>Dropdown Test</h3>
      <DropdownTest />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam esse, omnis id officiis suscipit necessitatibus alias vitae illo exercitationem! Culpa tempore nostrum reiciendis incidunt fugit excepturi qui! Fuga, voluptatum.
      </p>
    </div>
  </React.Fragment>
));
