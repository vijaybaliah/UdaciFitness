const POSTFIX = '.json';

const getUrl = (url) => `${url}${POSTFIX}` 

export const verifyUserMobileNo = () => getUrl('/users/send_user_otp');
export const signUpUser = () => getUrl('/users/sign_up_user');
