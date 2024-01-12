import {Linking, Alert, Platform} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export const RequestGalleryPermission = async permissionType => {
  const openSettings = () => {
    Linking.openSettings();
  };

  let permissionStatus;

  try {
    // Request permission based on the provided type.
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS[permissionType]);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID[permissionType]);
    }

    switch (permissionStatus) {
      case RESULTS.GRANTED:
        console.log(`Permission '${permissionType}' granted.`);
        // You can perform actions here that require the permission.
        return 'granted';

      case RESULTS.DENIED:
        console.log(
          `Permission '${permissionType}' denied. Access is restricted.`,
        );
        // Handle the case where the user denied the permission.
        Alert.alert(
          'Permission Denied',
          `Please enable ${permissionType} permissions manually in your device settings.`,
          [
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              onPress: () =>
                console.log(
                  `Permission Denied - User Cancelled for ${permissionType}`,
                ),
              style: 'cancel',
            },
          ],
        );
        return 'denied';

      case RESULTS.LIMITED:
        console.log(
          `Permission '${permissionType}' limited. Access may be restricted.`,
        );
        // Handle the case where the permission is granted but with limitations.
        Alert.alert(
          'Permission Limited',
          `Permission '${permissionType}' is granted but with limitations. Access may be restricted.`,
          [
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              onPress: () =>
                console.log(
                  `Permission Limited - User Cancelled for ${permissionType}`,
                ),
              style: 'cancel',
            },
          ],
        );
        return 'limited';

      case RESULTS.BLOCKED:
        console.log(
          `Permission '${permissionType}' blocked. Access is blocked.`,
        );
        // Provide information to the user about how to enable the permission manually.
        Alert.alert(
          'Permission Blocked',
          `Permission '${permissionType}' is blocked. Please enable it in your device settings.`,
          [
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              onPress: () =>
                console.log(
                  `Permission Blocked - User Cancelled for ${permissionType}`,
                ),
              style: 'cancel',
            },
          ],
        );
        return 'blocked';

      case RESULTS.UNAVAILABLE:
        console.log(
          `Permission '${permissionType}' unavailable. Unable to determine status.`,
        );
        // Handle the case where permission status is unavailable.
        Alert.alert(
          'Permission Unavailable',
          `Unable to determine ${permissionType} permission status. Please try again later.`,
          [
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              onPress: () =>
                console.log(
                  `Permission Unavailable - User Cancelled for ${permissionType}`,
                ),
              style: 'cancel',
            },
          ],
        );
        return 'unavailable';

      default:
        return 'unknown';
    }
  } catch (error) {
    console.error(
      `Error while requesting ${permissionType} permission:`,
      error,
    );
    return 'error';
  }
};
