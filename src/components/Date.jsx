import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Box } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';

export default function Date() {
  const [dateSelected, setDateSelected] = React.useState('')
  const [modalSwitch, setModalSwitch] = React.useState(false);
  const today = dayjs();

  const handleFocus = () => {
    setModalSwitch(true);
  };
  const handleBlur = () => {
    setModalSwitch(false);
  };

  return (
    <Box sx={{ mt: 1, width: 335, position: 'relative' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}
        localeText={{
          datePickerToolbarTitle: 'Text'
        }}>
        <DateField
          label="Birthday"
          fullWidth
          InputLabelProps={{
            shrink: true,
            style: { color: '#fff' }
          }}
          value={dateSelected}
          onFocus={handleFocus}
          sx={{
            borderWidth: "2px",
            '& fieldset': {
              borderColor: '#242424', borderWidth: "2px",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset":{
                borderColor: "rgba(255, 255, 255, 0.5) !important"
              },
              "&.Mui-focused fieldset": {
                borderColor: "white !important",
              }
            },
            input: { color: 'white' }
          }}
        />
        {modalSwitch && (
          <StaticDatePicker
            defaultValue={today}
            onChange={(newValue) => {
              setDateSelected(newValue);
            }}
            onAccept={() => { setModalSwitch(false) }}
            sx={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              backgroundColor: "#1B1B1B",
              '.MuiPickersDay-today': {
                backgroundColor: "black",
                border: "1px solid #1976d2 !important"
              },
              '.MuiPickersDay-root': {
                color: "white",
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black'
                },
              },
              '.MuiPickersArrowSwitcher-button': {
                color: "white"
              },
              '.MuiTypography-root': {
                color: 'white'
              },
              '.MuiButton-root': {
                color: 'white'
              },
              '.MuiPickersYear-yearButton': {
                borderRadius: 0,
                '&:hover': {
                  backgroundColor: "white",
                  color: "black"

                }
              }
            }}
            dayOfWeekFormatter={(_day, weekday) => `${weekday.format('dd')}`}
            slotProps={{
              toolbar: { toolbarFormat: 'MMM YYYY' },
            }}
          >
          </StaticDatePicker >
        )}
      </LocalizationProvider>
    </Box>
  );
}