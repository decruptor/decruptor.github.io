import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// Design-system components (verbatim from the design kit; they export named functions)
import { PixelPlus } from './components/brand/PixelPlus.jsx';
import { Logo } from './components/brand/Logo.jsx';
import { Skyline } from './components/brand/Skyline.jsx';
import { PhoneFrame } from './components/brand/PhoneFrame.jsx';
import { Button } from './components/actions/Button.jsx';
import { Tag } from './components/display/Tag.jsx';
import { Badge } from './components/display/Badge.jsx';
import { Stat } from './components/display/Stat.jsx';
import { Step } from './components/display/Step.jsx';
import { Feature } from './components/display/Feature.jsx';
import { PixelProgress } from './components/data/PixelProgress.jsx';
import { ProgressBar } from './components/data/ProgressBar.jsx';
import { BlockRow } from './components/data/BlockRow.jsx';
import { DataReadout } from './components/data/DataReadout.jsx';
import { Band } from './components/layout/Band.jsx';

// Pages (the kit's files attach shared styles + helpers to window; keep that contract)
import './pages/Shell.jsx';
import './pages/Home.jsx';
import './pages/Solves.jsx';
import './pages/Research.jsx';
import './pages/Recovery.jsx';
import './pages/About.jsx';

// The kit's page code destructures window.DS and references global React — provide both.
window.React = React;
window.DS = {
  PixelPlus, Logo, Skyline, PhoneFrame, Button,
  Tag, Badge, Stat, Step, Feature,
  PixelProgress, ProgressBar, BlockRow, DataReadout, Band,
};

const SCREENS = { home: window.HomeScreen, solves: window.SolvesScreen, research: window.ResearchScreen, recovery: window.RecoveryScreen, about: window.AboutScreen };

function App() {
  const init = (location.hash || '').slice(1);
  const [page, setPage] = React.useState(SCREENS[init] ? init : 'home');
  const go = (p) => { setPage(p); history.replaceState(null, '', '#' + p); window.scrollTo(0, 0); };
  const Screen = SCREENS[page];
  return (<><window.SiteHeader page={page} go={go} /><Screen go={go} /><window.SiteFooter /></>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
