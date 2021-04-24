import React, { useState } from 'react';
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
  restaurants: { loading: loadingRestaurants },
}) => ({
  userUid,
  isMinimumAppDataLoaded: loadingLocation && loadingRestaurants,
});

InitializationWrapperBase.defaultProps = {};

InitializationWrapperBase.propTypes = {
  userUid: PropTypes.string.isRequired,
  isMinimumAppDataLoaded: PropTypes.bool.isRequired,
};

export const InitializationWrapper = connect(mapStateToProps)(InitializationWrapperBase);
