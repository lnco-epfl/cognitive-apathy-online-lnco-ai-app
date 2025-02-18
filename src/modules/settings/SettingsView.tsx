import { FC, useMemo, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { isEqual } from 'lodash';

import {
  CalibrationSettingsType,
  GeneralSettingsType,
  PhotoDiodeSettings,
  PracticeSettingsType,
  TaskSettingsType,
  ValidationSettingsType,
  useSettings,
} from '../context/SettingsContext';
import CalibrationSettingsView from './CalibrationSettingsView';
import GeneralSettingsView from './GeneralSettingsView';
import PhotoDiodeSettingsView from './PhotoDiodeSettingsView';
import PracticeSettingsView from './PracticeSettingsView';
import TaskSettingsView from './TaskSettingsView';
import ValidationSettingsView from './ValidationSettingsView';

const SettingsView: FC = () => {
  const {
    generalSettings: generalSettingsSaved,
    practiceSettings: practiceSettingsSaved,
    calibrationSettings: calibrationSettingsSaved,
    validationSettings: validationSettingsSaved,
    taskSettings: taskSettingsSaved,
    photoDiodeSettings: photoDiodeSettingsSaved,
    saveSettings,
  } = useSettings();

  const [generalSettings, updateGeneralSettings] =
    useState<GeneralSettingsType>(generalSettingsSaved);
  const [practiceSettings, updatePracticeSettings] =
    useState<PracticeSettingsType>(practiceSettingsSaved);
  const [calibrationSettings, updateCalibrationSettings] =
    useState<CalibrationSettingsType>(calibrationSettingsSaved);
  const [validationSettings, updateValidationSettings] =
    useState<ValidationSettingsType>(validationSettingsSaved);
  const [taskSettings, updateTaskSettings] =
    useState<TaskSettingsType>(taskSettingsSaved);
  const [photoDiodeSettings, updatePhotoDiodeSettings] =
    useState<PhotoDiodeSettings>(photoDiodeSettingsSaved);

  const saveAllSettings = (): void => {
    saveSettings('generalSettings', generalSettings);
    saveSettings('practiceSettings', practiceSettings);
    saveSettings('calibrationSettings', calibrationSettings);
    saveSettings('validationSettings', validationSettings);
    saveSettings('taskSettings', taskSettings);
    saveSettings('photoDiodeSettings', photoDiodeSettings);
  };

  const disableSave = useMemo(() => {
    if (
      isEqual(generalSettingsSaved, generalSettings) &&
      isEqual(practiceSettingsSaved, practiceSettings) &&
      isEqual(calibrationSettingsSaved, calibrationSettings) &&
      isEqual(validationSettingsSaved, validationSettings) &&
      isEqual(taskSettingsSaved, taskSettings) &&
      isEqual(photoDiodeSettingsSaved, photoDiodeSettings)
    ) {
      return true;
    }
    return false;
  }, [
    generalSettingsSaved,
    generalSettings,
    practiceSettingsSaved,
    practiceSettings,
    calibrationSettingsSaved,
    calibrationSettings,
    validationSettingsSaved,
    validationSettings,
    taskSettingsSaved,
    taskSettings,
    photoDiodeSettingsSaved,
    photoDiodeSettings,
  ]);

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Settings</Typography>
      <GeneralSettingsView
        generalSettings={generalSettings}
        onChange={updateGeneralSettings}
      />
      <PracticeSettingsView
        practiceSettings={practiceSettings}
        onChange={updatePracticeSettings}
      />
      <CalibrationSettingsView
        calibrationSettings={calibrationSettings}
        onChange={updateCalibrationSettings}
      />
      <ValidationSettingsView
        validationSettings={validationSettings}
        onChange={updateValidationSettings}
      />
      <TaskSettingsView
        taskSettings={taskSettings}
        onChange={updateTaskSettings}
      />
      <PhotoDiodeSettingsView
        photoDiodeSettings={photoDiodeSettings}
        onChange={updatePhotoDiodeSettings}
      />
      <Box>
        <Button
          variant="contained"
          onClick={saveAllSettings}
          disabled={disableSave}
        >
          Save
        </Button>
      </Box>
    </Stack>
  );
};

export default SettingsView;
