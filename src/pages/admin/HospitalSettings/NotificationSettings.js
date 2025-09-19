import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@mui/material';
import {
  Save as SaveIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

const NotificationSettings = ({ settings, onSave, onSwitchChange }) => {
  return (
    <Card>
      <CardContent>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography
            variant='h6'
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <NotificationsIcon /> Notifications
          </Typography>
          <IconButton onClick={() => onSave('notifications')}>
            <SaveIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemText primary='Email Notifications' />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.notifications.emailNotifications}
                onChange={(e) =>
                  onSwitchChange(
                    'notifications',
                    'emailNotifications',
                    e.target.checked
                  )
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary='SMS Notifications' />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.notifications.smsNotifications}
                onChange={(e) =>
                  onSwitchChange(
                    'notifications',
                    'smsNotifications',
                    e.target.checked
                  )
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary='Push Notifications' />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.notifications.pushNotifications}
                onChange={(e) =>
                  onSwitchChange(
                    'notifications',
                    'pushNotifications',
                    e.target.checked
                  )
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary='Appointment Reminders' />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.notifications.appointmentReminders}
                onChange={(e) =>
                  onSwitchChange(
                    'notifications',
                    'appointmentReminders',
                    e.target.checked
                  )
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary='System Alerts' />
            <ListItemSecondaryAction>
              <Switch
                checked={settings.notifications.systemAlerts}
                onChange={(e) =>
                  onSwitchChange(
                    'notifications',
                    'systemAlerts',
                    e.target.checked
                  )
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
