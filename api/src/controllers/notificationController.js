import { Notification } from '../models';

export const getNotifications = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const notifications = await Notification.find({ to: userId }).populate({
      path: 'from',
      select: 'fullName username profileImg',
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (err) {
    console.error(`Error while fetching all notifications ${err.message}`);
    next(err);
  }
};

// delete all notifications
export const deleteNotifications = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: 'Notifications deleted successfully' });
  } catch (err) {
    console.error(`Error while deleting all notifications ${err}`);
    next(err);
  }
};
