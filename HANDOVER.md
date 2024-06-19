# Handover Document

## Project Overview

- **Project Name:** EVENTIO.
- **Version:** 0.0.1
- **Main Features:**
  - Login & Authorized State
  - Event List
  - Create Event
- **Placeholder Screens**
  - Profile Screen
  - Registration Screen
  - Edit event screen\*
  - Edit user screen\*

## Current Status

- **Completed:**

  - **Login Screen** (UI, UX, API integration)
    - Authorisation
    - Refreshing of user session token
    - Saving (and loading) user session to/(from) secure storage
  - **Events Screen** (UI, UX, API integration)
    - Optimistic updates
  - **Profile Screen**
    - Context menu
      - Logout

- **In Progress:**

  - Registration Screen

- **Backlog**

  - Edit event screen (needs design)
  - Edit user screen (needs design)

## Known Issues

- **Add Event Modal**

  - Add event modal currently (if implemented via `presentation: "modal"` and `router.push("/add-event"))` throws unexplainable error
  - Current workaround is to display the Screen as a regular tab
  - This should be investigated and fixed properly to adhere to Design

- **Font on Android**

  - For some reason font on android is rendering thinner than desired
  - The style values are correctly inherited (and displayed in Inspector)
  - But are rendered thinner than the design
  - This should be investigated and corrected.
  - I suspect some additional setup for fonts

- **IOS navigation on random press**

  - Sometimes when pressing somewhere on the screen the app is navigated back to /events
  - Might be a caching error or issue with simulator, could not find where this could originate
  - No visible error is displayed

- **Event Detail Attendees**
  - When leaving/joining event the attendees list changes
  - Needs to be investigated
  - POI: @/hooks/useEvent #optimisticQueryUpdate

## Next Steps

- Finish **SignupScreen**

  - The screen should be design complient but is missing API integration and form types
  - Implement error handling

- **Event Detail**

  - Actions besides Join/Leave event are non functional
    - Edit event UX not specified
  - Gear icon/button is missing in header
    - UX specification not defined

- General error handling

  - Specify how to handle errors and integrate it into the application
  - Currently only LoginScreen and CreateEventScreen have BARE error handling

- Review TODO: Tags:

  - There are several `TODO:` tags inside the project hinting at parts of the application which need to be addressed

- Component Testing
  - Add component testing via react-native-testing-library
  - Due to the time constrait there was not enough time to add component tests

## Additional Notes

### Setup Instructions

- Available in [README.MD](README.md#get-started)

### Code Conventions

- All matters regarding code convetions are available in [CONTRIBUTING.MD](CONTRIBUTING.md)
