export type NotificationCallback = (event: any, id: string, userInfo: any) => void

export const initializeNotifications = () => {}
export const terminateNotifications = () => {}
export const showNotification = () => Promise.resolve(null)
export const getNotificationsPermission = () => Promise.resolve('denied')
export const requestNotificationsPermission = () => Promise.resolve('denied')
export const supportsNotifications = () => false
export const supportsNotificationsPermissionRequest = () => false
export const getNotificationSettingsUrl = () => null
export const onNotificationEvent = () => {}
