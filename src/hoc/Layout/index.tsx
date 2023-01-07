import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './Layout.scss';
import { LayoutProps } from './Layout';

const Layout = ({ children }: LayoutProps) => (
  <div className="Layout">
    <div className="Layout__body">{children}</div>
  </div>
);

export default Layout;
