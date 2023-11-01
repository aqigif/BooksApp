import * as React from 'react';
import NavigationApp from './navigation';
import CStatusBar from './components/CStatusBar';

export default function App() {
  return (
    <>
      <CStatusBar backgroundColor={'white'} />
      <NavigationApp />
    </>
  );
}
