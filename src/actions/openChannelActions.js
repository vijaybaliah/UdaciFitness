import { 
  OPEN_CHANNEL_LIST_SUCCESS,
  OPEN_CHANNEL_LIST_FAIL,
  OPEN_CHANNEL_PROGRESS_START,
  OPEN_CHANNEL_PROGRESS_END,
  CLEAR_SELECTED_OPEN_CHANNEL,
} from './index';
import { sbGetOpenChannelList, sbGetOpenChannel, sbOpenChannelExit } from './sendbirdActions';

export const getOpenChannelList = (openChannelListQuery) => {
  return (dispatch) => {
      if (openChannelListQuery.hasNext) {
          sbGetOpenChannelList(openChannelListQuery)
          .then((channels) => dispatch({
              type: OPEN_CHANNEL_LIST_SUCCESS,
              list: channels
          }))
          .catch((error) => dispatch({ type: OPEN_CHANNEL_LIST_FAIL }))
      } else {
          dispatch({ type: OPEN_CHANNEL_LIST_FAIL });
      }
  }
}


export const clearSelectedOpenChannel = () => {
  return { type: CLEAR_SELECTED_OPEN_CHANNEL };
};

export const openChannelProgress = start => {
  return {
    type: start ? OPEN_CHANNEL_PROGRESS_START : OPEN_CHANNEL_PROGRESS_END
  };
};

