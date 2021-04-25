import { withIconButton } from './withIconButton/withIconButton';
import { LikeIcon } from './LikeIcon';
import { ShareIcon } from './ShareIcon';
import { CrossIcon } from './CrossIcon';
import { CallIcon } from './CallIcon';
import { PinIcon } from './PinIcon';
import { WhatsappIcon } from './WhatsappIcon';
import { TelegramIcon } from './TelegramIcon';
import { CopyIcon } from './CopyIcon';
import { LinkIcon } from './LinkIcon';
import { CrossCutterlyIcon } from './CrossCutterlyIcon';
import { BittedHeartIcon } from './BittedHeartIcon';

const LikeIconButton = withIconButton(BittedHeartIcon);
const ShareIconButton = withIconButton(ShareIcon);
const CrossIconButton = withIconButton(CrossCutterlyIcon);

export {
  LikeIconButton,
  ShareIconButton,
  CrossIconButton,
  BittedHeartIcon,
  CallIcon,
  CopyIcon,
  CrossCutterlyIcon,
  CrossIcon,
  LikeIcon,
  LinkIcon,
  PinIcon,
  ShareIcon,
  TelegramIcon,
  WhatsappIcon,
  withIconButton,
};