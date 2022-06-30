import AddUserIcon from './AddUserIcon';
import BittedHeartIcon from './BittedHeartIcon';
import CallIcon from './CallIcon';
import ChevronLeftIcon from './ChevronLeftIcon';
import ChevronRightIcon from './ChevronRightIcon';
import CopyIcon from './CopyIcon';
import CrossCutterlyIcon from './CrossCutterlyIcon';
import CrossIcon from './CrossIcon';
import CurvedArrow from './CurvedArrow';
import LikeIcon from './LikeIcon';
import LinkIcon from './LinkIcon';
import PinIcon from './PinIcon';
import SwipeLeftIcon from './SwipeLeftIcon';
import SwipeRightIcon from './SwipeRightIcon';
import ShareIcon from './ShareIcon';
import TelegramIcon from './TelegramIcon';
import WhatsappIcon from './WhatsappIcon';
import withIconButton from './withIconButton/withIconButton';
import withTextIcon from './withTextIcon/withTextIcon';
import withTextIconButton from './withTextIconButton/withTextIconButton';

const LikeIconButton = withIconButton(BittedHeartIcon);
const LikeIconButtonWithText = withTextIconButton(LikeIconButton);
const ShareIconButton = withIconButton(ShareIcon);
const AddUserIconButton = withIconButton(AddUserIcon);
const CrossIconButton = withIconButton(CrossCutterlyIcon);
const CrossIconButtonWithText = withTextIconButton(CrossCutterlyIcon);

export {
  AddUserIcon,
  AddUserIconButton,
  BittedHeartIcon,
  CallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  CrossCutterlyIcon,
  CrossIconButtonWithText,
  CrossIcon,
  CrossIconButton,
  CurvedArrow,
  LikeIcon,
  LikeIconButton,
  LikeIconButtonWithText,
  LinkIcon,
  PinIcon,
  ShareIcon,
  ShareIconButton,
  SwipeLeftIcon,
  SwipeRightIcon,
  TelegramIcon,
  WhatsappIcon,
  withIconButton,
  withTextIcon,
  withTextIconButton,
};
