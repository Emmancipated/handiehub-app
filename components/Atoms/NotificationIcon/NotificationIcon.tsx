import React from 'react';
import {SvgXml} from 'react-native-svg';
import {notifications} from '../../../assets/svgs/svgs';

export const NotificationIcon = () => {
  return <SvgXml xml={notifications} width="24px" height="24px" />;
};
