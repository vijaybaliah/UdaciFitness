import SendBird from 'sendbird';
import {
	GET_OPEN_CHANNEL_SUCCESS,
	GET_OPEN_CHANNEL_FAIL,
} from './index';

const APP_ID = 'C20B2634-C892-41AB-9543-B68D073E13C9';


export const sbCreateOpenChannelListQuery = () => {
	const sb = SendBird.getInstance();
	return sb.OpenChannel.createOpenChannelListQuery();
}

export const sbGetOpenChannelList = (openChannelListQuery) => {
	return new Promise((resolve, reject) => {
		openChannelListQuery.next((channels, error) => {
			if (error) {
				reject(error);
			} else {
				resolve(channels);
			}
		});
	});
}

export const sbConnect = (userId, nickname) => {
	return new Promise((resolve, reject) => {
		const sb = new SendBird({ 'appId': APP_ID });
		sb.connect(userId, (user, error) => {
			if (error) {
				reject('SendBird Login Failed.');
			} else {
				resolve(sbUpdateProfile(nickname));
			}
		})
	})
};

export const sbDisconnect = () => {
	return new Promise((resolve, reject) => {
		const sb = SendBird.getInstance();
		if (sb) {
			sb.disconnect(() => {
				resolve(null);
			});
		} else {
			resolve(null);
		}
	})
}

export const sbUpdateProfile = (nickname) => {
	return new Promise((resolve, reject) => {
		if (!nickname) {
			reject('Nickname is required.');
			return;
		}
		const sb = SendBird.getInstance();
		sb.updateCurrentUserInfo(nickname, null, (user, error) => {
			if (error) {
				reject('Update profile failed.')
			} else {
				resolve(user);
			}
		})
	})
}

export const sbGetCurrentInfo = () => {
	const sb = SendBird.getInstance();
	return {
		profileUrl: sb.currentUser.profileUrl,
		nickname: sb.currentUser.nickname
	}
}

export const onOpenChannelPress = channelUrl => {
  return dispatch => {
    return sbGetOpenChannel(channelUrl)
      .then(channel =>
        dispatch({
          type: GET_OPEN_CHANNEL_SUCCESS,
          channel: channel
        })
      )
      .catch(error => dispatch({ type: GET_OPEN_CHANNEL_FAIL }));
  };
};

export const sbGetOpenChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.OpenChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbCreateOpenChannel = channelName => {
  return new Promise((resolve, reject) => {
    if (!channelName) {
      reject('Channel name is required.');
      return;
    }
    const sb = SendBird.getInstance();
    sb.OpenChannel.createChannel(channelName, null, null, (channel, error) => {
      if (error) {
        reject('Create OpenChannel Failed.');
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbOpenChannelEnter = channel => {
  return new Promise((resolve, reject) => {
    channel.enter((response, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbOpenChannelExit = channel => {
  return new Promise((resolve, reject) => {
    channel.exit((response, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbCreateParticipantListQuery = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetOpenChannel(channelUrl)
      .then(channel => resolve(channel.createParticipantListQuery()))
      .catch(error => reject(error));
  });
};

export const sbGetParticipantList = participantListQuery => {
  return new Promise((resolve, reject) => {
    participantListQuery.next((participants, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(participants);
      }
    });
  });
};

export const sbGetChannelTitle = channel => {
  if (channel.isOpenChannel()) {
    return channel.name;
  } else {
    const { members } = channel;
    let nicknames = members
      .map(member => {
        return member.nickname;
      })
      .join(', ');

    if (nicknames.length > 21) {
      nicknames = nicknames.substring(0, 17) + '...';
    }

    return nicknames;
  }
};

export const sbGetMessageList = previousMessageListQuery => {
  const limit = 30;
  const reverse = true;
  return new Promise((resolve, reject) => {
    previousMessageListQuery.load(limit, reverse, (messages, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(messages);
      }
    });
  });
};


export const sbSendTextMessage = (channel, textMessage, callback) => {
  if (channel.isGroupChannel()) {
    channel.endTyping();
  }
  return channel.sendUserMessage(textMessage, (message, error) => {
    callback(message, error);
  });
};
export const sbSendFileMessage = (channel, file, callback) => {
  const data = '';
  const customType = '';
  const thumbSizeList = [{ maxWidth: 160, maxHeight: 160 }];
  const startTime = Date.now() / 1000;
  const clearIntervalId = setInterval(() => {
    const curTime = Date.now() / 1000;
    if (curTime - startTime > 1 * 60 * 60) {
      clearInterval(clearIntervalId);
    }
    if (SendBird.getInstance() && SendBird.getInstance().getConnectionState() === 'OPEN') {
      clearInterval(clearIntervalId);
      channel.sendFileMessage(file, data, customType, thumbSizeList, (message, error) => {
        callback(message, error);
      });
    }
  }, 500);
};

export const sbTypingStart = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.startTyping();
        resolve(channel);
      })
      .catch(error => reject(error));
  });
};

export const sbTypingEnd = channelUrl => {
  return new Promise((resolve, reject) => {
    sbGetGroupChannel(channelUrl)
      .then(channel => {
        channel.endTyping();
        resolve(channel);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const sbIsTyping = channel => {
  if (channel.isTyping()) {
    const typingMembers = channel.getTypingMembers();
    if (typingMembers.length == 1) {
      return `${typingMembers[0].nickname} is typing...`;
    } else {
      return 'several member are typing...';
    }
  } else {
    return '';
  }
};


export const sbUserBlock = blockUserId => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.blockUserWithUserId(blockUserId, (user, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
};

export const sbGetGroupChannel = channelUrl => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(channel);
      }
    });
  });
};

export const sbChannelDeleteMessage = (channel, message) => {
  return new Promise((resolve, reject) => {
    channel.deleteMessage(message, (response, error) => {
      error ? reject(error) : resolve(response);
    });
  });
};

export const sbChannelUpdateMessage = (channel, message, contents) => {
  return new Promise((resolve, reject) => {
    channel.updateUserMessage(message.messageId, contents, null, null, (response, error) => {
      error ? reject(error) : resolve(response);
    });
  });
};

export const sbMarkAsRead = ({ channelUrl, channel }) => {
  if (channel) {
    channel.markAsRead();
  } else {
    sbGetGroupChannel(channelUrl).then(channel => channel.markAsRead());
  }
};

export const sbCreatePreviousMessageListQuery = (channelUrl, isOpenChannel) => {
  return new Promise((resolve, reject) => {
    if (isOpenChannel) {
      sbGetOpenChannel(channelUrl)
        .then(channel => resolve(channel.createPreviousMessageListQuery()))
        .catch(error => reject(error));
    } else {
      sbGetGroupChannel(channelUrl)
        .then(channel => resolve(channel.createPreviousMessageListQuery()))
        .catch(error => reject(error));
    }
  });
};

export const sbAdjustMessageList = list => {
  return list.map((message, i) => {
    message['time'] = sbUnixTimestampToDate(message.createdAt);
    message['readCount'] = 0;
    if (message.isUserMessage() || message.isFileMessage()) {
      message['isUser'] = message.sender.userId === SendBird.getInstance().getCurrentUserId();
    } else {
      message['isUser'] = false;
    }
    if (message.sender) {
      message.sender['isShow'] = true;
      if (!message.sender.profileUrl) {
        message.sender.profileUrl = 'default-image';
      }
    }

    if (i < list.length - 1) {
      let prevMessage = list[i + 1];
      if (message.isUserMessage() || message.isFileMessage()) {
        if (prevMessage.isUserMessage() || prevMessage.isFileMessage()) {
          if (prevMessage.sender.userId === message.sender.userId) {
            message.sender.isShow = false;
          }
        }
      }
    }
    return message;
  });
};
