
export const getMyInfo = (() => {
    let instance: (() => any) | null = null;

    return () => {
        if (!instance) {
            instance = () => {
                let myInfo = null;

                const myInfoCookie = document.cookie.split('; ').find((row) => row.startsWith('myInfo='));
                if (myInfoCookie) {
                    const decodedCookie = decodeURIComponent(myInfoCookie.split('=')[1]);
                    myInfo = JSON.parse(decodedCookie);
                }

                return myInfo;
            };
        }
        return instance();
    };
})();
