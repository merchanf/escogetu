import * as icons from "./Icons";

export default {
  title: "Icons",
};

const LikeButton = icons.withIconButton(icons.LikeIcon);

export const Call = () => <icons.CallIcon />;

export const Cross = () => <icons.CrossIcon />;

export const like = () => <icons.LikeIcon />;

export const Share = () => <icons.ShareIcon />;

export const Pin = () => <icons.PinIcon />;

export const WhatsappIcon = () => <icons.WhatsappIcon />;

export const TelegramIcon = () => <icons.TelegramIcon />;

export const CopyIcon = () => <icons.CopyIcon />;

export const LinkIcon = () => <icons.CopyIcon />;

export const LikeButtonRed = () => <LikeButton color="red" />;

export const LikeButtonGreen = () => <LikeButton color="green" />;

export const LikeButtonBlack = () => <LikeButton />;

export const LikeButtonRedLarge = () => <LikeButton color="red" size="large" />;
