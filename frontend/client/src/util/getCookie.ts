export const getCookie = (name: string) => {
  let cookieArray = document.cookie.split('; ');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookiePair = cookieArray[i].split('=');
    if(name == cookiePair[0]) {
      return cookiePair[1];
    }
  }
  return null;
}
