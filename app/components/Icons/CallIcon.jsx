import Icon from "./Icon/Icon";

const CallIcon = (props) => {
  const svg = (
    <svg
      focusable={false}
      width="100%"
      height="100%"
      viewBox="0 0 96 96"
      role="img"
      aria-labelledby={`Like Icon`}
    >
      <path
        d="M88.3,63c-5.9,0-11.6-0.9-17.1-2.7c-2.7-0.9-6-0.1-7.6,1.6L52.8,70C40.3,63.4,32.5,55.6,26,43.2l7.9-10.5
	c2.1-2.1,2.8-5,1.9-7.9C34,19.4,33,13.6,33,7.7C33,3.5,29.6,0,25.3,0H7.7C3.5,0,0,3.5,0,7.7C0,56.4,39.6,96,88.3,96
	c4.2,0,7.7-3.5,7.7-7.7V70.7C96,66.5,92.5,63,88.3,63z"
      />
    </svg>
  );

  return <Icon {...props} svg={svg} />;
};

export default CallIcon;
