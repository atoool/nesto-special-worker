import React from 'react';

import DoneTabSVG from './DoneTabSVG.svg';
import ProfileSVG from './ProfileSVG.svg';
import ToDoSVG from './ToDoSVG.svg';
import NotificationSVG from './NotificationSVG.svg';
import DoneSVG from './DoneSVG.svg';
import TickSVG from './TickSVG.svg';
import EditSVG from './EditSVG.svg';
import UserSVG from './UserSVG.svg';
import LockSVG from './LockSVG.svg';
import NoOrdersSVG from './NoOrdersSVG.svg';
// import Success2SVG from './Success2SVG.svg';
// import Success1SVG from './Success1SVG.svg';
// import RightCaretSVG from './RightCaretSVG.svg';
// import RightArrowSVG from './RightArrowSVG.svg';
// import ReToDoSVG from './ReToDoSVG.svg';
// import PackScanSVG from './PackScanSVG.svg';
// import MarkAvailabilitySVG from './MarkAvailabilitySVG.svg';
// import BinAssignSVG from './BinAssignSVG.svg';
// import CartSVG from './CartSVG.svg';
// import NoNotificationSVG from './NoNotificationSVG.svg';
// import PickerChoiceSVG from './PickerChoiceSVG.svg';
// import NoResponseSVG from './NoResponseSVG.svg';
// import SuccessSubstituteSVG from './SuccessSubstituteSVG.svg';
// import ItemRemovedSVG from './ItemRemovedSVG.svg';
// import CustAvailableSVG from './CustAvailableSVG.svg';

const GetIcon = ({name, color, width}) => {
  if (name === 'ToDo') {
    return <ToDoSVG color={color} width={width} />;
  } else if (name === 'Notifications') {
    return <NotificationSVG color={color} width={width} />;
  } else if (name === 'Profile') {
    return <ProfileSVG color={color} width={width} />;
  } else if (name === 'Done') {
    return <DoneTabSVG color={color} width={width} />;
  } else if (name === 'UserSVG') {
    return <UserSVG color={color} width={width} />;
  } else if (name === 'LockSVG') {
    return <LockSVG color={color} width={width} />;
  } else if (name === 'EditSVG') {
    return <EditSVG color={color} width={width} />;
  } else if (name === 'NoOrdersSVG') {
    return <NoOrdersSVG color={color} width={width} />;
  } else if (name === 'DoneSVG') {
    return <DoneSVG color={color} width={width} />;
  } else if (name === 'TickSVG') {
    return <TickSVG color={color} width={width} />;
  }
  //   else if (name === 'CartSVG') {
  //     return <CartSVG color={color} width={width} />;
  //   } else if (name === 'MarkAvailabilitySVG') {
  //     return <MarkAvailabilitySVG color={color} width={width} />;
  //   }
  //   else if (name === 'PackScanSVG') {
  //     return <PackScanSVG color={color} width={width} />;
  //   } else if (name === 'ReToDoSVG') {
  //     return <ReToDoSVG color={color} width={width} />;
  //   } else if (name === 'RightCaretSVG') {
  //     return <RightCaretSVG color={color} width={width} />;
  //   } else if (name === 'RightArrowSVG') {
  //     return <RightArrowSVG color={color} width={width} />;
  //   } else if (name === 'Success2SVG') {
  //     return <Success2SVG color={color} width={width} />;
  //   }
  //   else if (name === 'Success1SVG') {
  //     return <Success1SVG color={color} width={width} />;
  //   } else if (name === 'NoNotificationSVG') {
  //     return <NoNotificationSVG color={color} width={width} />;
  //   } else if (name === 'CustAvailableSVG') {
  //     return <CustAvailableSVG color={color} width={width} />;
  //   } else if (name === 'SuccessSubstituteSVG') {
  //     return <SuccessSubstituteSVG color={color} width={width} />;
  //   } else if (name === 'PickerChoiceSVG') {
  //     return <PickerChoiceSVG color={color} width={width} />;
  //   } else if (name === 'NoResponseSVG') {
  //     return <NoResponseSVG color={color} width={width} />;
  //   } else if (name === 'ItemRemovedSVG') {
  //     return <ItemRemovedSVG color={color} width={width} />;
  //   }
};

export default GetIcon;
