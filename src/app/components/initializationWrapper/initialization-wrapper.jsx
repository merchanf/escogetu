import React from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useMount } from '@hooks/use-mount.hook';
import { hydrate } from '@actions/hydrate.action';
import { LoadingIcon } from '@app/components';

const InitializationWrapperBase = ({ children, userUid, isMinimumAppDataLoaded }) => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(hydrate(userUid));
  });

  if (!isMinimumAppDataLoaded) {
    return <LoadingIcon />;
  }

  return children;
};

const mapStateToProps = ({
  user: {
    userUid,
    geoLocation: { loading: loadingLocation },
  },
}) => ({
  userUid,
  isMinimumAppDataLoaded: !loadingLocation,
});

InitializationWrapperBase.defaultProps = {
  userUid: null,
};

InitializationWrapperBase.propTypes = {
  userUid: PropTypes.string,
  isMinimumAppDataLoaded: PropTypes.bool.isRequired,
};

export const InitializationWrapper = connect(mapStateToProps)(InitializationWrapperBase);
