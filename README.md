# PCF Controls

Just a repo of controls that might be useful to the community.  I'm building out a catalogue of these as I try to get a handle on what the best practices are for building out controls.

Catalogue so far includes:
* Number Button Selector (a simple incrementor that has plus/minus buttons)
* Countdown Timer (a simple countdown timer showing days/hours/minutes/seconds until date)
* Keybinding Example (allows you to create a keyboard shortcut, and assign an action to it)
* Progress Bar (takes a percentage value and represents this as a progress bar)
* Notification - Pulsing (this takes a string, and then pulses the message against a blue background)

# To Build
Set up your environment as per the following DOCS article:
https://docs.microsoft.com/en-us/powerapps/developer/component-framework/create-custom-controls-using-pcf

Download the files contained within the control.. e.g. NumberButtonSelector/ControlManifest.Input.xml, NumberButtonSelector/index.ts, NumberButtonSelector/css/NumberButtonSelector.css

Then open that directory, and execute "npm run build".  This transcompilates the TS to normal JS.

Then execute "npm start".  This attacheds to the control to a test harness, so you can test the control works.

# To Publish
Set up your publisher information:
"pac solution init --publisherName <enter your publisher name> --customizationPrefix <enter your publisher name>"

Reference your solution.
"pac solution add-reference --path <path or relative path of your PowerApps component framework project on disk>"
  
Run the following.
"msbuild /t:restore" followed by then "msbuild"  (this step needs to be done within Developer Command Prompt for VS)
Note: for further information on what this command actually does:
https://docs.microsoft.com/en-us/nuget/reference/msbuild-targets#restore-target



It will output a solution file to your publishing directory/out/debug folder

# Upload to D365

Upload, and use as you would any other control.  i.e. goto a form, add an element, click on properties, then control, then add custom control.


# Tips for New Players

* After deployment, ensure you increment the version number of the solution otherwise the changes won't be reflected within Dynamics.
e.g. version="0.0.1" becomes version="0.0.2" in your manifest file.
  <control namespace="ControlsAndrewLy" constructor="CountDownTimer" version="0.0.2" display-name-key="Countdown Timer Control" 
  description-key="A simple countdown timer, takes a date as an input" control-type="standard">
  
* Do not include an img/preview.png at this stage, it will fail deployment.  Bug noted.

* To get the enable/disabled status of a control, this information is available from context.Mode.isControlDisabled.

* React components aren't supported for framework components yet. This is due to the way React components would get added to the host React app, basically as a disconnected DOM tree which could lead to a lot of unforseen issues. We are actively working on a good solution for React support, and hope to have good news in this area soon. (Greg Hurlman)

* In the Keybinding example, it will show a js error message "Refused to get Unsafe Headers".   This is a known bug with the D365 platform, and being tracked currently (Internal Bug ID: 1339680).

