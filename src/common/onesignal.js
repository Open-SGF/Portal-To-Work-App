import { Platform } from 'quasar';
import { loadScript } from './helpers';

export async function setup() {
    if (window === undefined) return;

    const isLocalHost = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

    if (Platform.is.cordova || Platform.is.capacitor || isLocalHost) {
        return;
    }

    await loadScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js');

    return await getOneSignalUserId();
}

function getOneSignalUserId() {
    return new Promise((resolve, reject) => {
        window.OneSignal = window.OneSignal || [];

        OneSignal.push(() => {
            OneSignal.init({
                appId: process.env.ONESIGNAL_APP_ID,
            });

            // OneSignal.getUserId().then((userId) => {
            //     resolve(userId);
            // });

            OneSignal.on('subscriptionChange',() => {
                OneSignal.push(() => {
                    OneSignal.getUserId().then((userId) => {
                        resolve(userId);
                    });
                });
            });
        });

        // OneSignal.push(() => {
        // })
    });
}
