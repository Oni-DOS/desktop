export type DesktopNotificationPermission = 'denied' | 'granted' | 'default'

export type NotificationCallback<T = any> = (
  event: string,
  id: string,
  userInfo: T
) => void

export const initializeNotifications = (settings?: any) => {}
export const terminateNotifications = () => {}
export const showNotification = (
  title: string,
  body: string,
  userInfo?: any
) => Promise.resolve(null)
export const getNotificationsPermission = () =>
  Promise.resolve('denied' as 'denied' | 'granted' | 'default')
export const requestNotificationsPermission = () => Promise.resolve(false)
export const supportsNotifications = () => false
export const supportsNotificationsPermissionRequest = () => false
export const getNotificationSettingsUrl = () => null
export const onNotificationEvent = <T = any>(callback: NotificationCallback<T>) => {}
